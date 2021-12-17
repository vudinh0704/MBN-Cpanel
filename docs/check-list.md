# Check list
## 1. Cách đặt tên
- Tên file **kebab-case**
```Example: login-screen.js```
- File CSS đặt cùng tên với component và thêm hậu tố **.module.scss**
```Example: login-screen.module.scss```
- Folder sử dụng **kebab-case**
```Example: mbn-api```
- Tên biến sử dụng **camelCase**
```javascript
const variable = 'test';
let variableBoolean = true;
```
- Nếu một component gồm nhiều file thì tạo một folder để chứa các file liên quan
- Tạo file **index.js** để export cho nhiều component
## 2. ES6
- Khai báo biến sử dụng **let** hoặc **const**
## 3. CSS
- SCSS
- Styled-components khi có yêu cầu SSR
## 4. Github
- Tên branch giống với tên của task trên Jira
- Luôn format code trước khi commit
## 5. Quy định khác
### 5.1. Alignment - JSX syntax
```html
// bad
<Foo superLongParam="bar"
     anotherSuperLongParam="baz" />

// good
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>

// if props fit in one line then keep it on the same line
<Foo bar="bar" />

// children get indented normally
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
>
    <Spazz />
</Foo>
```
### 5.2. Quotes
- Luôn sử dụng dấu nháy đôi (") cho các thuộc tính JSX, còn lại dùng nháy đơn (')
```html
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />

// bad
<Foo style={{ left: "20px" }} />

// good
<Foo style={{ left: '20px' }} />
```
### 5.3. Props
- Sử dụng **camelCase** cho **prop names**
```html
// bad
<Foo
    UserName="hello"
    phone_number={12345678}
/>

// good
<Foo
    userName="hello"
    phoneNumber={12345678}
/>
```
### 5.4. Tags
- Luôn sử dụng **self-close** nếu không chứa tag con
```html
// bad
<Foo className="stuff"></Foo>

// good
<Foo className="stuff" />

// bad
<Foo
    bar="bar"
    baz="baz" />

// good
<Foo
    bar="bar"
    baz="baz"
/>
```
### 5.5. Stateless function components
```javascript
// Using an ES2015 (ES6) arrow function:
var Aquarium = (props) => {
    var fish = getFish(props.species);
    return <Tank>{fish}</Tank>;
};

// Or with destructuring and an implicit return, simply:
var Aquarium = ({species}) => (
    <Tank>
        {getFish(species)}
    </Tank>
);

// Then use: <Aquarium species="rainbowfish" />
```
### 5.6. Formatting Attributes
```
<input
    type="text"
    value={this.state.foo}
    onChange={this._handleInputChange.bind(this, 'foo')}
/>
```
### 5.7. Sử dụng React.memo
- Tối ưu re-render
```javascript
function ProductList() {
  const productList = useSelector((state) => state.products);
  const dispatch = useDispatch();
  return (
    <div>
      {productList.map((item) => (
        <ProductItem
          key={item.id}
          productItem={item}
        />
      ))}
    <div/>
  )
}
export default React.memo(ProductList);
```
- Nếu child components nhận props function thì cần sử dụng useCallback
```javascript
function ProductList() {
  const productList = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const handleAddToCart = useCallback(
    (product) => dispatch(addToCart(product)),
    [dispatch]
  );
  return (
    <div>
      {productList.map((item) => (
        <ProductItem
          key={item.id}
          productItem={item}
          addToCart={handleAddToCart}
        />
      ))}
    <div/>
  )
}
export default React.memo(ProductList);
```