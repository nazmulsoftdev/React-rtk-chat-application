export const getPartnerInfo = (participate, email) => {
  return participate.find((item) => item.email !== email);
};
