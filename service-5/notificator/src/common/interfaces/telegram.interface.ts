import { Telegram } from 'telegraf';

export interface ITelegramUser {
  id: number;
  is_bot: boolean;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface ITelegramChat {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  type: 'private' | 'group' | 'supergroup' | 'channel';
}

export interface ITelegramMessage {
  message_id: number;
  from: ITelegramUser;
  chat: ITelegramChat;
  date: number;
  text?: string;
}

export interface ITelegramUpdate {
  update_id: number;
  message: ITelegramMessage;
}

export interface ITelegramBotInfo {
  id: number;
  is_bot: boolean;
  first_name: string;
  username: string;
  can_join_groups: boolean;
  can_read_all_group_messages: boolean;
  supports_inline_queries: boolean;
  can_connect_to_business: boolean;
  has_main_web_app: boolean;
}

export interface ITelegramContext {
  update: ITelegramUpdate;
  Telegram: Telegram;
  botInfo: ITelegramBotInfo;
  state: Record<string, any>;
}
