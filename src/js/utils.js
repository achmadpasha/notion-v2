export const formatText = (string) => {
  // ubah '/n' pada string menjadi tag <br>
  return string.replace(/\n/g, '<br>');
};