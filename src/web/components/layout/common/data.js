import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CategoryIcon from '@mui/icons-material/Category';
import CommentIcon from '@mui/icons-material/Comment';
import DehazeIcon from '@mui/icons-material/Dehaze';
import DescriptionIcon from '@mui/icons-material/Description';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RedeemIcon from '@mui/icons-material/Redeem';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';

const avatar = [
  {
    name: 'Cài đặt',
    link: '/setting'
  },
  {
    name: 'Đăng xuất',
    link: '/logout'
  }
];

const data = [
  {
    menu: 'account',
    subMenu: [
      {
        name: 'Danh sách tài khoản MBN',
        link: '/account/mbn'
      },
      {
        name: 'Danh sách thiết bị cài đặt app MB',
        link: '/account/list-device-install-app-MB'
      },
      {
        name: 'Mở khóa xác thực điện thoại',
        link: '/account/unblock-mobile'
      }
    ],
    icon: <AccountBoxIcon />
  },
  {
    menu: 'article',
    subMenu: [
      {
        name: 'Danh sách tin đăng',
        link: '/article/list'
      },
      {
        name: 'Phục hồi tin',
        link: '/article/del-undo'
      },
      {
        name: 'Danh sách tin làm mới trong ngày',
        link: '/article/today-up'
      }
    ],
    icon: <DescriptionIcon />
  },
  {
    menu: 'category',
    subMenu: [
      {
        name: 'Báo vi phạm',
        link: '/category/feedback-type'
      },
      {
        name: 'Tên miền không hiển thị',
        link: '/category/classified-domain-list'
      },
      {
        name: 'Tên đường',
        link: '/category/street-list'
      },
      {
        name: 'Điểm nhận tin',
        link: '/category/news-receiving-point'
      },
      {
        name: 'Dự án bất động sản',
        link: '/category/realestate-project-list'
      },
      {
        name: 'Dịch vụ',
        link: '/category/service'
      }
    ],
    icon: <CategoryIcon />
  },
  {
    menu: 'invoice',
    subMenu: [
      {
        name: 'Danh sách hóa đơn',
        link: '/invoice/list'
      },
      {
        name: 'Thanh toán hộ',
        link: '/invoice/pay-for-user'
      },
      {
        name: 'Báo giá dịch vụ',
        link: '/invoice/service-quotes'
      },
      {
        name: 'Zalopay',
        link: '/invoice/zalopay'
      },
      {
        name: 'Momo',
        link: '/invoice/momo'
      },
      {
        name: 'Payoo',
        link: '/invoice/payoo'
      },
      {
        name: 'Viettel',
        link: '/invoice/viettel'
      }
    ],
    icon: <ReceiptIcon />
  },
  {
    menu: 'management',
    subMenu: [
      {
        name: 'Tài khoản cpanel',
        link: '/bo-user'
      },
      {
        name: 'Danh sách nhóm',
        link: '/role'
      },
      {
        name: 'Danh sách thông tin nhân viên',
        link: '/bo-user/profile'
      },
      {
        name: 'Danh sách chức năng',
        link: '/function'
      },
      {
        name: 'Danh sách chức năng cho nhóm',
        link: '/role/function'
      },
      {
        name: 'Danh sách thông báo',
        link: '/inbox-message'
      },
      {
        name: 'Kiểm tra push',
        link: '/push-check'
      },
      {
        name: 'Danh sách chuyên trang rao vặt',
        link: '/tag-page'
      }
    ],
    icon: <DehazeIcon />
  },
  {
    menu: 'promotion',
    subMenu: [
      {
        name: 'Tặng mã thưởng cho khách hàng',
        link: '/promotion/giveaway-for-customer'
      },
      {
        name: 'Khuyến mãi báo giấy',
        link: '/promotion/newpaper-promotion'
      },
      {
        name: 'Mã thưởng của nhân viên',
        link: '/promotion/agent-coupou-list'
      },
      {
        name: 'Mã thưởng của khách hàng',
        link: '/promotion/customer-coupou-list'
      },
      {
        name: 'Mã thưởng mời cài app',
        link: '/promotion/coupou-list'
      }
    ],
    icon: <RedeemIcon />
  },
  {
    menu: 'report',
    subMenu: [
      {
        name: 'Báo cáo duyệt tin và SEO',
        link: '/report'
      },
      {
        name: 'Thống kê xử lý chuyển dịch vụ tin lỗi',
        link: '/spam'
      },
      {
        name: 'Thống kê xử lý phản hồi',
        link: '/feedback'
      },
      {
        name: 'Thống kê tin đăng',
        link: '/classified'
      },
      {
        name: 'Thống kê tin đăng theo nguồn',
        link: '/classified/source'
      },
      {
        name: 'Thống kê tài khoản',
        link: '/member'
      },
      {
        name: 'Thống kê tài khoản spam',
        link: '/user-spam'
      },
      {
        name: 'Báo cáo danh sách user thanh toán nhiều hơn 700.000đ',
        link: '/rich-member'
      }
    ],
    icon: <CommentIcon />
  },
  {
    menu: 'seo',
    subMenu: [
      {
        name: 'Danh sách internal link container',
        link: '/seo/internal-link-containers'
      }
    ],
    icon: <ScreenSearchDesktopIcon />
  }
];

export { avatar, data };
