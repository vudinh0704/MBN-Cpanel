# React-hook-form quick start

# ref: [React-Hook-Form](https://react-hook-form.com/)

## **1. Controlled Components**

### **1.1 useForm**

```JSX
const {
  control,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting, isDirty }
} = useForm({
  resolver: yupResolver(editFunctionSchema),
  mode: 'onBlur',
  defaultValues: {
    id: 0,
    code: '',
    name: '',
    description: '',
    is_active: 'true'
  }
});
```

### **1.2 Controller**

##### **_1.2.1_ TextField**

```JSX
{
<Controller
  name='name'
  control={control}
  render={({ field: { onChange, onBlur, value, name, ref } }) => (
    <TextField
      id={name}
      label='label'
      value={value}
      type='type'
      inputProps={{ props }}
      onChange={onChange}
      onBlur={onBlur}
      error={!!errors.name}
      helperText={errors.name ? errors.name?.message : ''}
      inputRef={ref}
    />
  )}
/>}
```

##### **_1.2.2_ Select**

```JSX
{
<Controller
  name='is_active'
  control={control}
  render={({ field: { onChange, onBlur, value, name, ref } }) => (
    <FormControl style={{ width: 200 }}>
      <InputLabel id='input-label' variant='variant'>
        Active
      </InputLabel>
      <Select
        labelId='input-label'
        id={name}
        label='label'
        variant='variant'
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        <MenuItem value='true'>Sử dụng</MenuItem>
        <MenuItem value='false'>Không sử dụng</MenuItem>
      </Select>
    </FormControl>
  )}
/>}
```

### **1.3 Validator - Resolver: Yup**

```javascript
const editFunctionSchema = yup
  .object()
  .shape({
    id: yup.number().required(),
    code: yup
      .string()
      .required(resources.code.message)
      .min(3, resources.code.message),
    is_active: yup.string()
  })
  .required();
```

### **1.4 Combination**

```javascript
const editFunctionSchema = yup
  .object()
  .shape({
    id: yup.number().required(),
    code: yup
      .string()
      .required(resources.code.message)
      .min(3, resources.code.message),
    is_active: yup.string()
  })
  .required();


const Example = () => {

    const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty }
    } = useForm({
    resolver: yupResolver(editFunctionSchema),
    mode: 'onBlur',
    defaultValues: {
        id: 0,
        code: '',
        is_active: 'true'
    }
    });

    const onSubmit = (data, e) => {
        e.preventDefault();

        ...

        reset({ ...data }, { keepDirty: false });

        ...
    };


    return <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="code"
                    control={control}
                    render={({ field: { onChange, onBlur, value, name, ref } }) => (
                        <TextField
                        id={name}
                        label="Code"
                        value={value}
                        type="text"
                        inputProps={{ maxLength: 150 }}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!!errors.code}
                        helperText={errors.code ? errors.name?.message : ''}
                        inputRef={ref}
                        />
                    )}
                    />

                <Controller
                    name="is_active"
                    control={control}
                    render={({ field: { onChange, onBlur, value, name, ref } }) => (
                        <FormControl>
                        <InputLabel id="is-active-label" variant="outlined">
                            Active
                        </InputLabel>
                        <Select
                            labelId="is-active-label"
                            id={name}
                            label="Active"
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                        >
                            <MenuItem value="true">Sử dụng</MenuItem>
                            <MenuItem value="false">Không sử dụng</MenuItem>
                        </Select>
                        </FormControl>
                    )}
                    />
            </form>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isDirty || isSubmitting}
                >
                Áp dụng
                </Button>
        </>

}
```

## **2. Uncontrolled Components**
