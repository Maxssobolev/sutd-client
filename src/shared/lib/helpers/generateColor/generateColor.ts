export function stringToColor(str: string) {
  // Простая хеш-функция для генерации числа из строки
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Преобразование числа в шестнадцатеричную строку
  let color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  
  // Дополнение строкой нулей слева до 6 символов (цвет в формате #RRGGBB)
  while (color.length < 6) {
    color = '0' + color;
  }
  
  return '#' + color;
}