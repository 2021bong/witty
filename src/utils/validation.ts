export const checkEmail = (email: string) => {
  const emailRegexp =
    /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return email !== '' && email !== undefined && emailRegexp.test(email);
};

export const checkName = (name: string) => {
  const nameRegexp =
    /^[0-9a-zA-Z-ㄱ-힣-\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\" ].{0,7}$/;
  return name !== '' && name !== undefined && nameRegexp.test(name);
};

export const checkId = (id: string) => {
  const idRegexp = /^(?=.*[a-zA-z])(?=.*[0-9]).{6,15}$/;
  return id !== '' && id !== undefined && idRegexp.test(id);
};

export const checkPw = (pw: string) => {
  const pwRegexp =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[@#*!^])(?!(?=.*[\|{\}\[\]\/?.,;:|\)~`\-_+<>\$%&\\\=\(\'\"]).).{8,16}$/;
  return pw !== '' && pw !== undefined && pwRegexp.test(pw);
};
