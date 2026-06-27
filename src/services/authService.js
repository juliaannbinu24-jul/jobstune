export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

export const getRecruiters = () => {
  return JSON.parse(localStorage.getItem("recruiters")) || [];
};

export const saveUser = (user) => {
  const users = getUsers();
  const exists = users.some(u => u.email === user.email);
  if (exists) {
    alert("User with this email already exists!");
    return false;
  }
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  return true;
};


export const saveRecruiter = (recruiter) => {
  const recruiters = getRecruiters();
  recruiters.push(recruiter);
  localStorage.setItem("recruiters", JSON.stringify(recruiters));
};
