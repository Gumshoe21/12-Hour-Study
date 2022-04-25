<FormControl isInvalid={props.isInvalid}>
  <Input
    variant="filled"
    fontSize={16}
    height={16}
    type={props.tyhpe}
    placeholder={props.placeholder}
    name="email"
    value={props.value}
    onChange={(e) => onChange(e)}
  />

  <ErrorMessage errors={props.errors} label={props.label} />
</FormControl>;
