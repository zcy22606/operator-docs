import { defineConfig } from 'vitepress'
import taskLists from 'markdown-it-task-lists'

// 部署到子路径时（例如 GitHub Pages 的 /operator-docs/），在构建时设置 DOCS_BASE。
// 用自己的域名部署到根路径时不用设置。
const base = process.env.DOCS_BASE || '/'

const zhSidebar = [
  {
    text: '开始',
    items: [{ text: '这份指南怎么用', link: '/guide/overview' }]
  },
  {
    text: '一、成为运营方之前',
    items: [
      { text: '要求、收益与注意事项', link: '/before/requirements' },
      { text: '什么样的场景可以做', link: '/before/scenes' },
      { text: '收入怎么算', link: '/before/payment' }
    ]
  },
  {
    text: '二、成为运营方之后',
    items: [
      { text: '收到设备前', link: '/after/before-devices' },
      { text: '收到设备时', link: '/after/receiving-devices' },
      { text: '收到设备后：日常运营', link: '/after/daily-operations' },
      { text: '数据上传 SOP', link: '/after/upload' },
      { text: '验收与结算', link: '/after/acceptance' },
      { text: '异常处理', link: '/after/troubleshooting' }
    ]
  },
  {
    text: '三、商务拓展',
    items: [
      { text: '和门店谈合作', link: '/business/negotiation' },
      { text: '推荐网络与推荐计划', link: '/business/referral' },
      {
        text: '协议模板',
        link: '/business/templates/',
        collapsed: false,
        items: [
          { text: '员工录制知情同意书', link: '/business/templates/operator-consent' },
          { text: '门店合作协议', link: '/business/templates/store-agreement' },
          { text: '设备交接单', link: '/business/templates/device-handover' },
          { text: '推荐登记表', link: '/business/templates/referral-form' }
        ]
      }
    ]
  }
]

const enSidebar = [
  {
    text: 'Start here',
    items: [{ text: 'How to use this guide', link: '/en/guide/overview' }]
  },
  {
    text: '1. Before you become an operator',
    items: [
      { text: 'Requirements, benefits and cautions', link: '/en/before/requirements' },
      { text: 'Which sites qualify', link: '/en/before/scenes' },
      { text: 'How you get paid', link: '/en/before/payment' }
    ]
  },
  {
    text: '2. After you become an operator',
    items: [
      { text: 'Before the devices arrive', link: '/en/after/before-devices' },
      { text: 'When the devices arrive', link: '/en/after/receiving-devices' },
      { text: 'Day-to-day operations', link: '/en/after/daily-operations' },
      { text: 'Data upload SOP', link: '/en/after/upload' },
      { text: 'Acceptance and settlement', link: '/en/after/acceptance' },
      { text: 'Troubleshooting', link: '/en/after/troubleshooting' }
    ]
  },
  {
    text: '3. Business development',
    items: [
      { text: 'Negotiating with sites', link: '/en/business/negotiation' },
      { text: 'Referral network and program', link: '/en/business/referral' },
      {
        text: 'Agreement templates',
        link: '/en/business/templates/',
        collapsed: false,
        items: [
          { text: 'Worker recording consent', link: '/en/business/templates/operator-consent' },
          { text: 'Site cooperation agreement', link: '/en/business/templates/store-agreement' },
          { text: 'Device handover form', link: '/en/business/templates/device-handover' },
          { text: 'Referral registration form', link: '/en/business/templates/referral-form' }
        ]
      }
    ]
  }
]

export default defineConfig({
  base,
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    config: (md) => {
      md.use(taskLists, { label: true })
    }
  },
  head: [['link', { rel: 'icon', href: `${base}favicon.svg` }]],

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'OpenRoboto 运营方指南',
      description: 'OpenRoboto 第一视角数据采集运营方手册',
      themeConfig: {
        nav: [
          { text: '开始', link: '/guide/overview' },
          { text: '成为运营方之前', link: '/before/requirements' },
          { text: '成为运营方之后', link: '/after/before-devices' },
          { text: '商务拓展', link: '/business/negotiation' }
        ],
        sidebar: zhSidebar,
        outline: { level: [2, 3], label: '本页内容' },
        docFooter: { prev: '上一页', next: '下一页' },
        lastUpdated: { text: '最后更新' },
        darkModeSwitchLabel: '外观',
        sidebarMenuLabel: '目录',
        returnToTopLabel: '回到顶部',
        langMenuLabel: '切换语言',
        footer: { message: 'OpenRoboto · openroboto.ai' }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'OpenRoboto Operator Guide',
      description: 'Handbook for OpenRoboto first-person data collection operators',
      themeConfig: {
        nav: [
          { text: 'Start', link: '/en/guide/overview' },
          { text: 'Before', link: '/en/before/requirements' },
          { text: 'After', link: '/en/after/before-devices' },
          { text: 'Business', link: '/en/business/negotiation' }
        ],
        sidebar: enSidebar,
        outline: { level: [2, 3], label: 'On this page' },
        footer: { message: 'OpenRoboto · openroboto.ai' }
      }
    }
  },

  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
              modal: {
                noResultsText: '没有找到相关内容',
                resetButtonTitle: '清除',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
              }
            }
          }
        }
      }
    },
    socialLinks: [{ icon: 'x', link: 'https://x.com/openroboto' }]
  }
})
