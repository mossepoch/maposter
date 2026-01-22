#!/bin/bash

set -e

echo "================================"
echo "  Maposter 部署脚本"
echo "================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查 Docker 和 Docker Compose
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker 未安装${NC}"
        echo ""
        echo "请先安装 Docker："
        echo "  Ubuntu: sudo apt install docker.io"
        echo "  CentOS: sudo yum install docker"
        echo "  或访问: https://docs.docker.com/get-docker/"
        exit 1
    fi

    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        echo -e "${RED}❌ Docker Compose 未安装${NC}"
        echo ""
        echo "请先安装 Docker Compose："
        echo "  https://docs.docker.com/compose/install/"
        exit 1
    fi

    echo -e "${GREEN}✓ Docker 已安装${NC}"
}

# 检查系统资源
check_resources() {
    echo ""
    echo "检查系统资源..."

    if command -v free &> /dev/null; then
        TOTAL_MEM=$(free -g | awk '/^Mem:/{print $2}')
        AVAIL_MEM=$(free -g | awk '/^Mem:/{print $7}')
        echo "  内存: ${AVAIL_MEM}GB 可用 / ${TOTAL_MEM}GB 总计"

        if [ "$AVAIL_MEM" -lt 4 ]; then
            echo -e "${YELLOW}⚠️  警告: 可用内存少于 4GB，构建可能较慢${NC}"
            echo "  建议: 至少保证 4GB 可用内存"
        fi
    fi

    DISK_AVAIL=$(df -h . | awk 'NR==2 {print $4}')
    echo "  磁盘: ${DISK_AVAIL} 可用"
}

# 配置环境
setup_environment() {
    echo ""
    echo "配置环境变量..."

    if [ ! -f "web/.env" ]; then
        echo "  创建 .env 文件..."
        cat > web/.env << EOF
# 管理员密码（修改为您自己的密码）
ADMIN_PASSWORD=admin123

# 如果使用域名，修改为您的域名
# DOMAIN=your-domain.com
EOF
        echo -e "${GREEN}✓ 已创建 web/.env 文件${NC}"
        echo -e "${YELLOW}  请编辑 web/.env 修改管理员密码${NC}"
    else
        echo -e "${GREEN}✓ .env 文件已存在${NC}"
    fi
}

# 禁用 BuildKit（避免内存问题）
disable_buildkit() {
    export DOCKER_BUILDKIT=0
    export COMPOSE_DOCKER_CLI_BUILD=0
    echo -e "${GREEN}✓ 已禁用 Docker BuildKit${NC}"
}

# 构建服务
build_services() {
    echo ""
    echo "================================"
    echo "  开始构建服务"
    echo "================================"
    echo ""

    echo "构建 Docker 镜像（可能需要 10-15 分钟）..."
    echo ""

    # 分步构建
    echo -e "${BLUE}[1/2] 构建后端...${NC}"
    (cd web && docker-compose build backend)

    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ 后端构建失败${NC}"
        exit 1
    fi

    echo ""
    echo -e "${BLUE}[2/2] 构建前端...${NC}"
    (cd web && docker-compose build frontend)

    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ 前端构建失败${NC}"
        exit 1
    fi

    echo ""
    echo -e "${GREEN}✓ 所有服务构建完成${NC}"
}

# 启动服务
start_services() {
    echo ""
    echo "================================"
    echo "  启动服务"
    echo "================================"
    echo ""

    (cd web && docker-compose up -d)

    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ 服务启动失败${NC}"
        exit 1
    fi

    echo -e "${GREEN}✓ 服务已启动${NC}"
}

# 等待服务就绪
wait_for_services() {
    echo ""
    echo "等待服务启动（30秒）..."
    sleep 30

    echo ""
    echo "检查服务状态..."
    (cd web && docker-compose ps)
}

# 健康检查
health_check() {
    echo ""
    echo "================================"
    echo "  健康检查"
    echo "================================"
    echo ""

    # 检查后端健康状态
    BACKEND_HEALTH=$(curl -s http://localhost/api/health 2>/dev/null)
    if echo "$BACKEND_HEALTH" | grep -q '"status":"healthy"'; then
        echo -e "${GREEN}✓ 后端服务正常${NC}"
    else
        echo -e "${RED}✗ 后端服务异常${NC}"
        echo "  请检查日志: cd web && docker-compose logs backend"
    fi

    # 检查前端服务
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/ 2>/dev/null)
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✓ 前端服务正常${NC}"
    else
        echo -e "${RED}✗ 前端服务异常 (HTTP $HTTP_CODE)${NC}"
        echo "  请检查日志: cd web && docker-compose logs frontend"
    fi

    # 检查 API 接口
    API_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/api/gallery 2>/dev/null)
    if [ "$API_CODE" = "200" ]; then
        echo -e "${GREEN}✓ API 接口正常${NC}"
    else
        echo -e "${RED}✗ API 接口异常 (HTTP $API_CODE)${NC}"
        echo "  请检查日志: cd web && docker-compose logs"
    fi
}

# 显示访问信息
show_access_info() {
    echo ""
    echo "================================"
    echo "  🎉 部署成功！"
    echo "================================"
    echo ""

    # 获取服务器 IP
    if command -v hostname &> /dev/null; then
        SERVER_IP=$(hostname -I 2>/dev/null | awk '{print $1}')
    fi

    if [ -n "$SERVER_IP" ]; then
        echo "📌 访问地址:"
        echo "   http://${SERVER_IP}"
        echo "   http://${SERVER_IP}/docs (API 文档)"
        echo ""
    else
        echo "📌 访问地址:"
        echo "   http://localhost"
        echo "   http://localhost/docs (API 文档)"
        echo ""
    fi

    echo "📊 管理命令:"
    echo "   查看日志:   cd web && docker-compose logs -f"
    echo "   停止服务:   cd web && docker-compose down"
    echo "   重启服务:   cd web && docker-compose restart"
    echo "   查看状态:   cd web && docker-compose ps"
    echo ""

    echo "📚 更多帮助请查看 README.md"
    echo ""
}

# 主函数
main() {
    echo "开始部署 Maposter..."
    echo ""

    # 执行检查
    check_docker
    check_resources
    setup_environment
    disable_buildkit

    # 构建和启动
    build_services
    start_services
    wait_for_services
    health_check
    show_access_info
}

# 运行主函数
main
