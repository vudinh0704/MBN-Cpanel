export const resources = {
  generalError: 'Có lỗi xảy ra trong quá trình xử lý, bạn hãy thử lại sau!',
  auth: {
    login: 'Đăng nhập',
    authorize: 'Bạn cần đăng nhập!',
    forbidden: 'Bạn không thể thực hiện thao tác này!'
  },
  url: {
    rootUrl: `${process.env.ROOT}`
  },
  icon: {
    staticUrl: `${process.env.STATIC_URL}`,
    logo: `${process.env.STATIC_URL}${process.env.IMAGE_LOGO}`,
    userDefault: `${process.env.STATIC_URL}${process.env.IMAGE_USER_DEFAULT}`
  },
  func: {
    functionCodeIsRequired: 'Thiếu thông tin mã chức năng',
    functionCodeIsInvalid: 'Mã chức năng chỉ chấp nhận các ký tự [a-z0-9]',
    functionCodeIsInvalidLength: 'Mã chức năng phải từ 3-50 ký tự',
    functionCodeIsExisted: 'Mã chức năng đã tồn tại',
    functionNameIsRequired: 'Thiếu thông tin tên chức năng',
    functionNameIsInvalidLength: 'Tên chức năng phải từ 1-150 ký tự'
  },
  role: {
    roleCodeIsRequired: 'Thiếu thông tin mã vai trò',
    roleCodeIsInvalidLength: 'Mã vai trò phải từ 3-50 ký tự',
    roleCodeIsInvalid: 'Mã vai trò chỉ chấp nhận các ký tự [a-z0-9]',
    roleNameIsRequired: 'Thiếu thông tin tên vai trò',
    roleNameIsInvalidLength: 'Tên vai trò phải từ 1-150 ký tự',
    roleIsNotExisted: 'Không tồn tại vai trò'
  }
};
