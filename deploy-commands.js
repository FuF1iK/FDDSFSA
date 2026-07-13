require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('family')
    .setDescription('Показывать таблицу игроков семьи Majestic RP с автообновлением')
    .addStringOption(opt =>
      opt.setName('url').setDescription('Ссылка на профиль семьи (fletcher-wiki.com)').setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName('period').setDescription('Период: week (неделя), month (месяц), season (сезон)').setRequired(false)
        .addChoices(
          { name: 'Неделя', value: 'week' },
          { name: 'Месяц',  value: 'month' },
          { name: 'Сезон',  value: 'season' },
        )
    )
    .addIntegerOption(opt =>
      opt.setName('interval').setDescription('Интервал обновления в секундах (мин. 10, по умолч. 60)').setRequired(false)
    ),

  new SlashCommandBuilder()
    .setName('unwatch')
    .setDescription('Остановить обновление по ID первого сообщения')
    .addStringOption(opt =>
      opt.setName('message_id').setDescription('ID сообщения').setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName('listwatches')
    .setDescription('Список активных наблюдений'),
].map(c => c.toJSON());

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log('Команды успешно зарегистрированы.');
  } catch (err) {
    console.error(err);
  }
})();
