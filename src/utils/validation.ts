export const checkEmail = (email: string) => {
  const emailFormat =
    /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return email !== '' && email !== undefined && emailFormat.test(email);
};

export const checkName = (name: string) => {
  const nameFormat =
    /^[0-9a-zA-Z-ㄱ-힣\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\" ].{0,7}$/;
  return name !== '' && name !== undefined && nameFormat.test(name);
};

export const checkId = (id: string) => {
  const idFormat = /^(?=.*[a-zA-z])(?=.*[0-9]).{6,12}$/;
  return id !== '' && id !== undefined && idFormat.test(id);
};

export const checkPw = (pw: string) => {
  const pwFormat =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  return pw !== '' && pw !== undefined && pwFormat.test(pw);
};
