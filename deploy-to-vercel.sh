#!/bin/bash

# AGI Villa - Vercel 部署脚本
# 使用方式: ./deploy-to-vercel.sh

set -e

echo "🚀 开始部署 AGI Villa 到 Vercel..."
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查是否在项目根目录
if [ ! -d "frontend" ]; then
    echo -e "${RED}❌ 错误: 请在项目根目录运行此脚本${NC}"
    exit 1
fi

# 检查 Vercel CLI 是否安装
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI 未安装${NC}"
    echo ""
    echo "请选择安装方式:"
    echo "1) npm install -g vercel (推荐)"
    echo "2) pnpm add -g vercel"
    echo "3) 取消部署，稍后手动安装"
    echo ""
    read -p "请输入选项 (1-3): " install_option
    
    case $install_option in
        1)
            echo "正在安装 Vercel CLI..."
            npm install -g vercel
            ;;
        2)
            echo "正在安装 Vercel CLI..."
            pnpm add -g vercel
            ;;
        3)
            echo "已取消。请手动安装: npm install -g vercel"
            exit 0
            ;;
        *)
            echo -e "${RED}无效选项${NC}"
            exit 1
            ;;
    esac
fi

echo ""
echo "📋 部署前检查..."

# 进入前端目录
cd frontend

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    pnpm install
fi

# 运行检查
echo "🔍 运行性能检查..."
if pnpm perf-check; then
    echo -e "${GREEN}✅ 性能检查通过${NC}"
else
    echo -e "${YELLOW}⚠️  性能检查有警告，但继续部署${NC}"
fi

echo ""
echo "🔨 运行类型检查..."
if pnpm type-check; then
    echo -e "${GREEN}✅ 类型检查通过${NC}"
else
    echo -e "${RED}❌ 类型检查失败${NC}"
    read -p "是否继续部署? (y/N): " continue_deploy
    if [[ ! $continue_deploy =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo ""
echo "🔍 运行 Lint 检查..."
if pnpm lint; then
    echo -e "${GREEN}✅ Lint 检查通过${NC}"
else
    echo -e "${YELLOW}⚠️  Lint 有警告${NC}"
fi

echo ""
echo "🏗️  本地构建测试..."
if pnpm build; then
    echo -e "${GREEN}✅ 构建成功${NC}"
else
    echo -e "${RED}❌ 构建失败，请修复错误后重试${NC}"
    exit 1
fi

echo ""
echo "🎯 准备部署到 Vercel..."
echo ""

# 询问部署类型
echo "选择部署类型:"
echo "1) 预览部署 (vercel)"
echo "2) 生产部署 (vercel --prod)"
echo ""
read -p "请输入选项 (1-2): " deploy_option

case $deploy_option in
    1)
        echo ""
        echo "🚀 开始预览部署..."
        vercel
        ;;
    2)
        echo ""
        echo "🚀 开始生产部署..."
        vercel --prod
        ;;
    *)
        echo -e "${RED}无效选项${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✨ 部署完成！${NC}"
echo ""
echo "📊 下一步:"
echo "1. 访问 Vercel 提供的 URL 检查网站"
echo "2. 在 Vercel Dashboard 配置自定义域名"
echo "3. 设置环境变量（如果需要）"
echo "4. 配置 Google Search Console"
echo ""
echo "📚 详细文档: VERCEL_DEPLOYMENT.md"
echo ""

