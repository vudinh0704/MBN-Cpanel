# Hướng dẫn sử dụng `Prettier` để format code trước khi commit trên `Visual Studio Code`.

> Lưu ý: Hướng dẫn này để chạy thủ công `Prettier`, có thể bỏ qua không dùng nhưng khuyến khích dùng để dev tự kiểm tra lại code đã được format theo ý muốn hay chưa. (Vì sau khi commit code thì các file bị thay đổi cũng sẽ tự format theo config của `Prettier` một cách tự động).

## Cách 1. Sử dụng Prettier VSCode Extension

### 1. Tải và cài đặt extension [Link download](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### 2. Copy config bên dưới vào file cấu hình của `VSCode` và lưu lại. (File cấu hình tìm theo đường dẫn sau trên Windows: `C:\Users\[Your user]\AppData\Roaming\Code\User\settings.json`)

Config: Chọn tool formatter mặc định là `Prettier` và `Format code khi Lưu`

```
    "editor.defaultFormatter": "esbenp.prettier-vscode,
    "editor.formatOnSave": true
```

## Cách 2. Chạy command-line của Prettier

### 1. Chạy lệnh `npx prettier --check .` để kiểm tra file chưa được format.

### 2. Chạy lệnh `yarn prettier --write .` để tiến hành format toàn bộ file liệt kê ở Bước 1.

## Tham khảo

- [Cài đặt và chạy Prettier](https://prettier.io/docs/en/install.html)
- [Prettier config options](https://prettier.io/docs/en/options.html)
