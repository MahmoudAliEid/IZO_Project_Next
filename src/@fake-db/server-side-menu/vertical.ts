// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation: VerticalNavItemsType = [
  {
    title: 'Dashboards',
    icon: 'fluent-mdl2:contact-card-settings-mirrored',
    badgeContent: 'New',
    badgeColor: 'success',
    children: [
      {
        title: 'Analytics',
        path: '/dashboards/analytics'
      },
      {
        title: 'CRM',
        path: '/dashboards/crm'
      },
      {
        title: 'eCommerce',
        path: '/dashboards/ecommerce'
      }
    ]
  },
  {
    sectionTitle: 'Users & Permissions'
  },
  {
    title: 'User',
    icon: 'solar:user-id-bold',
    children: [
      {
        title: 'List',
        path: '/apps/user/list'
      },
      {
        title: 'View',
        children: [
          {
            title: 'Account',
            path: '/apps/user/view/account'
          },
          {
            title: 'Security',
            path: '/apps/user/view/security'
          },
          {
            title: 'Billing & Plans',
            path: '/apps/user/view/billing-plan'
          },
          {
            title: 'Notifications',
            path: '/apps/user/view/notification'
          },
          {
            title: 'Connection',
            path: '/apps/user/view/connection'
          }
        ]
      }
    ]
  },
  {
    title: 'Roles & Permissions',
    icon: 'bx:check-shield',
    children: [
      {
        title: 'Roles',
        path: '/apps/roles'
      },
      {
        title: 'Permissions',
        path: '/apps/permissions'
      }
    ]
  },
  {
    sectionTitle: 'Apps & Pages'
  },
  {
    title: 'Contacts',
    icon: 'bxs:contact',
    children: [
      {
        title: 'Suppliers',
        path: '/apps/contacts/suppliers'
      },
      {
        title: 'Customers',
        path: '/apps/contacts/customers'
      },
      {
        title: 'Customer Groups',
        path: '/apps/contacts/customerGroups'
      },
      {
        title: 'Import Contacts',
        path: '/apps/contacts/importContacts'
      }
    ]
  },
  {
    title: 'Products',
    icon: 'bxs:package',
    children: [
      {
        title: 'List Products',
        path: '/apps/products/listProducts'
      },
      {
        title: 'Add Product',
        path: '/apps/products/addProduct'
      },
      {
        title: 'Variations',
        path: '/apps/products/variations'
      },
      {
        title: 'Import Products',
        path: '/apps/products/importProducts'
      },
      {
        title: 'Add Opening Stock',
        path: '/apps/products/addOpeningStock'
      },
      {
        title: 'Import Opening Stock',
        path: '/apps/products/importOpeningStock'
      },
      {
        title: 'Sale Price Group',
        path: '/apps/products/salePriceGroup'
      },
      {
        title: 'Units',
        path: '/apps/products/units'
      },
      {
        title: 'Categories',
        path: '/apps/products/categories'
      },
      {
        title: 'Brands',
        path: '/apps/products/brands'
      },
      {
        title: 'Warranties',
        path: '/apps/products/warranties'
      }
    ]
  },
  {
    title: 'Inventory',
    icon: 'ic:twotone-inventory',
    children: [
      {
        title: 'Products Gallery',
        path: '/apps/inventory/products-gallery'
      },
      {
        title: 'inventory Report',
        path: '/apps/inventory/inventory-report'
      }
    ]
  },
  {
    title: 'Manufacturing',
    icon: 'ic:sharp-factory',
    children: [
      {
        title: 'Recipe',
        path: '/apps/manufacturing/recipe'
      },
      {
        title: 'Production',
        path: '/apps/manufacturing/production'
      },
      {
        title: 'Manufacturing Report',
        path: '/apps/manufacturing/manufacturing-report'
      }
    ]
  },
  {
    title: 'Purchase',
    icon: 'bxs:purchase-tag-alt',
    children: [
      {
        title: 'List Purchases',
        path: '/apps/purchase/list'
      },
      {
        title: 'List Purchase Return',
        path: '/apps/purchase/return'
      },
      {
        title: 'Map',
        path: '/apps/purchase/map'
      }
    ]
  },
  {
    title: 'Sales',
    icon: 'bxs:purchase-tag',
    children: [
      {
        title: 'All Sales',
        path: '/apps/sales/list'
      },
      {
        title: 'List Approved Quotations',
        path: '/apps/sales/approved-quotations'
      },
      {
        title: 'List Sales Return',
        path: '/apps/sales/return'
      },
      {
        title: 'Sales Commission Agents',
        path: '/apps/sales/commission-agents'
      },
      {
        title: 'Import Sales',
        path: '/apps/sales/import-sales'
      },
      {
        title: 'Quotations Terms',
        path: '/apps/sales/quotations-terms'
      }
    ]
  },
  {
    title: 'Vouchers',
    icon: 'basil:edit-solid',
    children: [
      {
        title: 'List Vouchers',
        path: '/apps/vouchers/list'
      },
      {
        title: 'Receipt Voucher',
        path: '/apps/vouchers/receipt-voucher'
      },
      {
        title: 'Journal Voucher List',
        path: '/apps/vouchers/journal-voucher'
      },
      {
        title: 'Expense Voucher',
        path: '/apps/vouchers/expense-voucher'
      }
    ]
  },
  {
    title: 'Cheques',
    icon: 'icon-park-solid:bank-card-one',
    children: [
      { title: 'List Cheques', path: '/apps/cheques/list' },
      {
        title: 'Add Cheque In',
        path: '/apps/cheques/add-cheque-in'
      },
      {
        title: 'Add Cheque Out',
        path: '/apps/cheques/add-cheque-out'
      },
      {
        title: 'Contact Bank',
        path: '/apps/cheques/contact-bank'
      }
    ]
  },
  {
    title: 'Warehouse',
    icon: 'ic:round-warehouse',
    children: [
      {
        title: 'List Warehouse',
        path: '/apps/warehouse/list'
      },
      {
        title: 'Warehouse Movement',
        path: '/apps/warehouse/movement'
      },
      {
        title: 'Received',
        path: '/apps/warehouse/received'
      },
      {
        title: 'Delivered',
        path: '/apps/warehouse/delivered'
      },
      {
        title: 'Warehouse Transfer',
        path: '/apps/warehouse/transfer'
      }
    ]
  },
  {
    sectionTitle: 'Cash & Bank'
  },
  {
    title: 'Cash List',
    icon: 'ic:sharp-money',
    path: '/apps/cash/list'
  },
  {
    title: 'Bank List',
    icon: 'fa:bank',
    path: '/apps/cash/list'
  },
  { sectionTitle: 'Reports & Accounts' },
  {
    title: 'Accounts',
    icon: 'ic:round-account-balance',
    children: [
      {
        title: 'List Accounts',
        path: '/apps/accounts/list'
      },
      {
        title: 'Balance Sheet',
        path: '/apps/accounts/balance-sheet'
      },
      {
        title: 'Trial Balance',
        path: '/apps/accounts/trial-balance'
      },
      {
        title: 'Cash Flow',
        path: '/apps/accounts/cash-flow'
      },
      {
        title: 'Payment Account Report',
        path: '/apps/accounts/payment-account-report'
      },
      {
        title: 'List Entries',
        path: '/apps/accounts/list-entries'
      },
      {
        title: 'Cost Center',
        path: '/apps/accounts/cost-center'
      }
    ]
  },
  {
    title: 'Reports', // Add "Report Sections" sub-menu
    icon: 'ic:round-report',
    children: [
      { title: 'Profit/Loss Report', path: '/apps/reports/profit-loss' },
      { title: 'Product Sales Day', path: '/apps/reports/product-sales-day' },
      { title: 'Purchase & Sale', path: '/apps/reports/purchase-sale' },
      { title: 'Tax Report', path: '/apps/reports/tax' },
      { title: 'Supplier & Customer Report', path: '/apps/reports/supplier-customer' },
      { title: 'Customer Groups Report', path: '/apps/reports/customer-groups' },
      { title: 'Inventory Report', path: '/apps/reports/inventory' },
      { title: 'Stock Expiry Report', path: '/apps/reports/stock-expiry' },
      { title: 'Stock Adjustment Report', path: '/apps/reports/stock-adjustment' },
      { title: 'Trending Products', path: '/apps/reports/trending-products' },
      { title: 'Items Report', path: '/apps/reports/items' },
      { title: 'Product Purchase Report', path: '/apps/reports/product-purchase' },
      { title: 'Product Sell Report', path: '/apps/reports/product-sell' },
      { title: 'Purchase Payment Report', path: '/apps/reports/purchase-payment' },
      { title: 'Sell Payment Report', path: '/apps/reports/sell-payment' },
      { title: 'Report Setting', path: '/apps/reports/settings' }, // For configuration options
      { title: 'Expense Report', path: '/apps/reports/expense' },
      { title: 'Register Report', path: '/apps/reports/register' },
      { title: 'Sales Representative Report', path: '/apps/reports/sales-rep' },
      { title: 'Activity Log', path: '/apps/reports/activity-log' }
    ]
  },
  {
    title: 'Patterns',
    icon: 'eos-icons:patterns',
    children: [
      {
        title: 'Business Locations',
        path: '/apps/patterns/business-locations'
      },
      {
        title: 'Define Patterns',
        path: '/apps/patterns/define-patterns'
      },
      {
        title: 'System Account',
        path: '/apps/patterns/system-account'
      }
    ]
  },
  {
    sectionTitle: 'Settings'
  },
  {
    title: 'Settings',
    icon: 'ic:round-settings',
    children: [
      {
        title: 'Business Settings',
        path: '/apps/settings/business-settings'
      },
      {
        title: 'Invoice Settings',
        path: '/apps/settings/invoice-settings'
      },
      {
        title: 'Barcode Settings',
        path: '/apps/settings/barcode-settings'
      },
      {
        title: 'Receipt Printers',
        path: '/apps/settings/receipt-printers'
      },
      {
        title: 'Tax Rates',
        path: '/apps/settings/tax-rates'
      },
      {
        title: 'Types of Service',
        path: '/apps/settings/types-of-service'
      }
    ]
  },
  {
    title: 'Email',
    icon: 'bx:envelope',
    path: '/apps/email'
  },
  {
    title: 'Chat',
    icon: 'bx:message',
    path: '/apps/chat'
  },
  {
    title: 'Calendar',
    icon: 'bx:calendar',
    path: '/apps/calendar'
  },
  {
    title: 'Invoice',
    icon: 'bx:food-menu',
    children: [
      {
        title: 'List',
        path: '/apps/invoice/list'
      },
      {
        title: 'Preview',
        path: '/apps/invoice/preview'
      },
      {
        title: 'Edit',
        path: '/apps/invoice/edit'
      },
      {
        title: 'Add',
        path: '/apps/invoice/add'
      }
    ]
  },

  {
    title: 'Pages',
    icon: 'bx:dock-top',
    children: [
      {
        title: 'User Profile',
        children: [
          {
            title: 'Profile',
            path: '/pages/user-profile/profile'
          },
          {
            title: 'Teams',
            path: '/pages/user-profile/teams'
          },
          {
            title: 'Projects',
            path: '/pages/user-profile/projects'
          },
          {
            title: 'Connections',
            path: '/pages/user-profile/connections'
          }
        ]
      },
      {
        title: 'Account Settings',
        children: [
          {
            title: 'Account',
            path: '/pages/account-settings/account'
          },
          {
            title: 'Security',
            path: '/pages/account-settings/security'
          },
          {
            title: 'Billing & Plans',
            path: '/pages/account-settings/billing-plan'
          },
          {
            title: 'Notifications',
            path: '/pages/account-settings/notifications'
          },

          {
            title: 'Connections',
            path: '/pages/account-settings/connections'
          }
        ]
      },
      {
        title: 'FAQ',
        path: '/pages/faq'
      },
      {
        title: 'Help Center',
        path: '/pages/help-center'
      },
      {
        title: 'Pricing',
        path: '/pages/pricing'
      },
      {
        title: 'Miscellaneous',
        children: [
          {
            openInNewTab: true,
            title: 'Coming Soon',
            path: '/pages/misc/coming-soon'
          },
          {
            openInNewTab: true,
            title: 'Under Maintenance',
            path: '/pages/misc/under-maintenance'
          },
          {
            openInNewTab: true,
            title: 'Page Not Found - 404',
            path: '/pages/misc/404-not-found'
          },
          {
            openInNewTab: true,
            title: 'Not Authorized - 401',
            path: '/pages/misc/401-not-authorized'
          },
          {
            openInNewTab: true,
            title: 'Server Error - 500',
            path: '/pages/misc/500-server-error'
          }
        ]
      }
    ]
  },
  {
    title: 'Auth Pages',
    icon: 'bx:lock-open-alt',
    children: [
      {
        title: 'Login',
        children: [
          {
            openInNewTab: true,
            title: 'Login v1',
            path: '/pages/auth/login-v1'
          },
          {
            openInNewTab: true,
            title: 'Login v2',
            path: '/pages/auth/login-v2'
          },
          {
            openInNewTab: true,
            title: 'Login With AppBar',
            path: '/pages/auth/login-with-appbar'
          }
        ]
      },
      {
        title: 'Register',
        children: [
          {
            openInNewTab: true,
            title: 'Register v1',
            path: '/pages/auth/register-v1'
          },
          {
            openInNewTab: true,
            title: 'Register v2',
            path: '/pages/auth/register-v2'
          },
          {
            openInNewTab: true,
            title: 'Register Multi-Steps',
            path: '/pages/auth/register-multi-steps'
          }
        ]
      },
      {
        title: 'Verify Email',
        children: [
          {
            openInNewTab: true,
            title: 'Verify Email v1',
            path: '/pages/auth/verify-email-v1'
          },
          {
            openInNewTab: true,
            title: 'Verify Email v2',
            path: '/pages/auth/verify-email-v2'
          }
        ]
      },
      {
        title: 'Forgot Password',
        children: [
          {
            openInNewTab: true,
            title: 'Forgot Password v1',
            path: '/pages/auth/forgot-password-v1'
          },
          {
            openInNewTab: true,
            title: 'Forgot Password v2',
            path: '/pages/auth/forgot-password-v2'
          }
        ]
      },
      {
        title: 'Reset Password',
        children: [
          {
            openInNewTab: true,
            title: 'Reset Password v1',
            path: '/pages/auth/reset-password-v1'
          },
          {
            openInNewTab: true,
            title: 'Reset Password v2',
            path: '/pages/auth/reset-password-v2'
          }
        ]
      },
      {
        title: 'Two Steps',
        children: [
          {
            openInNewTab: true,
            title: 'Two Steps v1',
            path: '/pages/auth/two-steps-v1'
          },
          {
            openInNewTab: true,
            title: 'Two Steps v2',
            path: '/pages/auth/two-steps-v2'
          }
        ]
      }
    ]
  },
  {
    title: 'Wizard Examples',
    icon: 'bx:spreadsheet',
    children: [
      {
        title: 'Checkout',
        path: '/pages/wizard-examples/checkout'
      },
      {
        title: 'Property Listing',
        path: '/pages/wizard-examples/property-listing'
      },
      {
        title: 'Create Deal',
        path: '/pages/wizard-examples/create-deal'
      }
    ]
  },
  {
    icon: 'bx:window-open',
    title: 'Dialog Examples',
    path: '/pages/dialog-examples'
  },
  {
    sectionTitle: 'User Interface'
  },
  {
    title: 'Typography',
    icon: 'bx:text',
    path: '/ui/typography'
  },
  {
    title: 'Icons',
    path: '/ui/icons',
    icon: 'bx:crown'
  },
  {
    title: 'Icons Test',
    path: '/ui/icons-test',
    icon: 'bx:crown'
  },
  {
    title: 'Cards',
    icon: 'bx:collection',
    children: [
      {
        title: 'Basic',
        path: '/ui/cards/basic'
      },
      {
        title: 'Advanced',
        path: '/ui/cards/advanced'
      },
      {
        title: 'Statistics',
        path: '/ui/cards/statistics'
      },
      {
        title: 'Widgets',
        path: '/ui/cards/widgets'
      },
      {
        title: 'Gamification',
        path: '/ui/cards/gamification'
      },
      {
        title: 'Actions',
        path: '/ui/cards/actions'
      }
    ]
  },
  {
    badgeContent: '19',
    title: 'Components',
    icon: 'bx:box',
    badgeColor: 'primary',
    children: [
      {
        title: 'Accordion',
        path: '/components/accordion'
      },
      {
        title: 'Alerts',
        path: '/components/alerts'
      },
      {
        title: 'Avatars',
        path: '/components/avatars'
      },
      {
        title: 'Badges',
        path: '/components/badges'
      },
      {
        title: 'Buttons',
        path: '/components/buttons'
      },
      {
        title: 'Button Group',
        path: '/components/button-group'
      },
      {
        title: 'Chips',
        path: '/components/chips'
      },
      {
        title: 'Dialogs',
        path: '/components/dialogs'
      },
      {
        title: 'List',
        path: '/components/list'
      },
      {
        title: 'Menu',
        path: '/components/menu'
      },
      {
        title: 'Pagination',
        path: '/components/pagination'
      },
      {
        title: 'Progress',
        path: '/components/progress'
      },
      {
        title: 'Ratings',
        path: '/components/ratings'
      },
      {
        title: 'Snackbar',
        path: '/components/snackbar'
      },
      {
        title: 'Swiper',
        path: '/components/swiper'
      },
      {
        title: 'Tabs',
        path: '/components/tabs'
      },
      {
        title: 'Timeline',
        path: '/components/timeline'
      },
      {
        title: 'Toasts',
        path: '/components/toast'
      },
      {
        title: 'Tree View',
        path: '/components/tree-view'
      },
      {
        title: 'More',
        path: '/components/more'
      },
      {
        title: 'Test',
        path: '/components/test'
      }
    ]
  },
  {
    sectionTitle: 'Forms & Tables'
  },
  {
    title: 'Form Elements',
    icon: 'bx:detail',
    children: [
      {
        title: 'Text Field',
        path: '/forms/form-elements/text-field'
      },
      {
        title: 'Select',
        path: '/forms/form-elements/select'
      },
      {
        title: 'Checkbox',
        path: '/forms/form-elements/checkbox'
      },
      {
        title: 'Radio',
        path: '/forms/form-elements/radio'
      },
      {
        title: 'Custom Inputs',
        path: '/forms/form-elements/custom-inputs'
      },
      {
        title: 'Textarea',
        path: '/forms/form-elements/textarea'
      },
      {
        title: 'Autocomplete',
        path: '/forms/form-elements/autocomplete'
      },
      {
        title: 'Date Pickers',
        path: '/forms/form-elements/pickers'
      },
      {
        title: 'Switch',
        path: '/forms/form-elements/switch'
      },
      {
        title: 'File Uploader',
        path: '/forms/form-elements/file-uploader'
      },
      {
        title: 'Editor',
        path: '/forms/form-elements/editor'
      },
      {
        title: 'Slider',
        path: '/forms/form-elements/slider'
      },
      {
        title: 'Input Mask',
        path: '/forms/form-elements/input-mask'
      },
      {
        title: 'Test',
        path: '/forms/form-elements/test'
      }
    ]
  },
  {
    icon: 'bx:detail',
    title: 'Form Layouts',
    path: '/forms/form-layouts'
  },
  {
    title: 'Form Validation',
    path: '/forms/form-validation',
    icon: 'bx:list-check'
  },
  {
    title: 'Form Wizard',
    path: '/forms/form-wizard',
    icon: 'bx:carousel'
  },
  {
    title: 'Table',
    icon: 'bx:table',
    path: '/tables/mui'
  },
  {
    title: 'Mui DataGrid',
    icon: 'bx:grid',
    path: '/tables/data-grid'
  },
  {
    sectionTitle: 'Charts & Misc'
  },
  {
    title: 'Charts',
    icon: 'bx:chart',
    children: [
      {
        title: 'Apex',
        path: '/charts/apex-charts'
      },
      {
        title: 'Recharts',
        path: '/charts/recharts'
      },
      {
        title: 'ChartJS',
        path: '/charts/chartjs'
      }
    ]
  },
  {
    path: '/acl',
    action: 'read',
    subject: 'acl-page',
    icon: 'bx:shield',
    title: 'Access Control'
  },
  {
    title: 'Others',
    icon: 'bx:dots-horizontal-rounded',
    children: [
      {
        title: 'Menu Levels',
        children: [
          {
            title: 'Menu Level 2.1'
          },
          {
            title: 'Menu Level 2.2',
            children: [
              {
                title: 'Menu Level 3.1'
              },
              {
                title: 'Menu Level 3.2'
              }
            ]
          }
        ]
      },
      {
        title: 'Disabled Menu',
        disabled: true
      },
      {
        title: 'Raise Support',
        externalLink: true,
        openInNewTab: true,
        path: 'https://themeselection.com/support'
      },
      {
        title: 'Documentation',
        externalLink: true,
        openInNewTab: true,
        path: 'https://demos.themeselection.com/sneat-mui-react-nextjs-admin-template/documentation/'
      }
    ]
  }
]

mock.onGet('/api/vertical-nav/data').reply(() => {
  return [200, navigation]
})
