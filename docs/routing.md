# Routing

## 1. Trang chủ

`pages\index.js`

## 2. Tài khoản

- Danh sách tài khoản
  `pages\account\index.js`
- Thông tin tài khoản
  `pages\account\profile\[id]\index.js`
- Tài khoản spam
  `pages\account\spam\index.js`

## 3. Hóa đơn

- Danh sách hóa đơn
  `pages\invoice\index.js`
- Chi tiết hóa đơn
  `pages\invoice\[id].js`

# Hash routing

## 1. Chức năng

`pages\function`

## 2. Thêm chức năng

## 3. Chỉnh sửa chức năng

`pages\function\edit#id={id}`

```javascript
const onSubmit = (data, e) => {
    e.preventDefault();

    ...
    router.push(
      {
        pathname: '/function/edit',
        hash: stringify({ id })
      },
      undefined,
      { shallow: true }
    );
    ...
}

```
