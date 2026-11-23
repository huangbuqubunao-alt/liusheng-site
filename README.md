# 留声官方网站静态站（`https://liusheng.app`）

零外部第三方脚本与 CDN 依赖、零行为追踪 Cookie，开箱即用适配 Cloudflare Pages、Vercel 或任意静态 Web 服务器。

## 目录结构

- `index.html`：主产品页（含 `#family-edition`、`#studio-edition`、`#download`、`#privacy`、`#faq` 商业直达锚点，严格对应客户端 `src/config/commercial.ts`）。
- `legal.html`：《最终用户许可协议 (EULA)》《隐私政策》《macOS 安装与授权指南》《工作室 DPA 委托处理协议》在线可读版。
- `config.js`：创始人发布上线唯一需要编辑的配置文件（填写 DMG 下载直链、收款页 URL 与 Apple 公证状态开关）。
- `styles.css` / `main.js`：暖纸朱砂设计系统与无依赖交互逻辑。
- `assets/`：仅存放经合规脱敏验证的《外婆/外公》双态样板截图（`GB 45438-2025`）。
- `_headers`：Cloudflare Pages 安全响应头。

## 本地预览

```bash
python3 -m http.server 4188 --directory website
# 浏览器访问 http://127.0.0.1:4188
```

## 快速上线（Cloudflare Pages / Vercel）

```bash
# Cloudflare Pages
npx wrangler pages deploy website --project-name=liusheng-web

# Vercel
npx vercel website --prod
```

部署与收款发码闭环操作清单请参见 [WEBSITE_AND_NOTARIZATION_LAUNCH_RUNBOOK.md](../docs/ops/WEBSITE_AND_NOTARIZATION_LAUNCH_RUNBOOK.md)。
