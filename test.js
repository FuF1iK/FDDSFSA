async function main() {
  console.log('Проверяю доступ к fletcher-wiki.com...');
  try {
    const res = await fetch('https://fletcher-wiki.com');
    console.log('Статус ответа:', res.status);
    const text = await res.text();
    console.log('Длина ответа:', text.length);
    console.log('Содержит __next_f:', text.includes('__next_f'));
    console.log('Содержит Проверяем:', text.includes('Проверяем'));
    console.log('Первые 200 символов:', text.slice(0, 200));
  } catch (e) {
    console.log('ОШИБКА ПОДКЛЮЧЕНИЯ:', e.message);
    console.log('Вероятно, хостинг блокирует исходящие запросы к этому сайту.');
  }
}
main();
