// Everything is explained here:
// @link https://gekko.wizb.it/docs/commandline/plugins.html

var config = {};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                          GENERAL SETTINGS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

config.debug = true; // for additional logging / debugging

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                         WATCHING A MARKET
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

config.watch = {

    // see https://gekko.wizb.it/docs/introduction/supported_exchanges.html
    exchange: 'bitfinex',
    currency: 'USD',
    asset: 'IOT',

    // You can set your own tickrate (refresh rate).
    // If you don't set it, the defaults are 2 sec for
    // okcoin and 20 sec for all other exchanges.
    // tickrate: 20
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING TRADING ADVICE
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

config.tradingAdvisor = {
    enabled: true,
    method: 'RSI_BULL_BEAR_ADX',
    candleSize: 10,
    historySize: 140,
    adapter: 'sqlite',
    talib: {
        enabled: false,
        version: '1.0.2'
    }
}

// Exponential Moving Averages settings:
config.DEMA = {
    // EMA weight (α)
    // the higher the weight, the more smooth (and delayed) the line
    short: 10,
    long: 21,
    // amount of candles to remember and base initial EMAs on
    // the difference between the EMAs (to act as triggers)
    thresholds: {
        down: -0.025,
        up: 0.025
    }
};

// MACD settings:
config.MACD = {
    // EMA weight (α)
    // the higher the weight, the more smooth (and delayed) the line
    short: 10,
    long: 21,
    signal: 9,
    // the difference between the EMAs (to act as triggers)
    thresholds: {
        down: -0.025,
        up: 0.025,
        // How many candle intervals should a trend persist
        // before we consider it real?
        persistence: 1
    }
};

// PPO settings:
config.PPO = {
    // EMA weight (α)
    // the higher the weight, the more smooth (and delayed) the line
    short: 12,
    long: 26,
    signal: 9,
    // the difference between the EMAs (to act as triggers)
    thresholds: {
        down: -0.025,
        up: 0.025,
        // How many candle intervals should a trend persist
        // before we consider it real?
        persistence: 2
    }
};

// Uses one of the momentum indicators but adjusts the thresholds when PPO is bullish or bearish
// Uses settings from the ppo and momentum indicator config block
config.varPPO = {
    momentum: 'TSI', // RSI, TSI or UO
    thresholds: {
        // new threshold is default threshold + PPOhist * PPOweight
        weightLow: 120,
        weightHigh: -120,
        // How many candle intervals should a trend persist
        // before we consider it real?
        persistence: 0
    }
};

// RSI settings:
config.RSI = {
    interval: 14,
    thresholds: {
        low: 30,
        high: 70,
        // How many candle intervals should a trend persist
        // before we consider it real?
        persistence: 1
    }
};

// TSI settings:
config.TSI = {
    short: 13,
    long: 25,
    thresholds: {
        low: -25,
        high: 25,
        // How many candle intervals should a trend persist
        // before we consider it real?
        persistence: 1
    }
};

// Ultimate Oscillator Settings
config.UO = {
    first: {weight: 4, period: 7},
    second: {weight: 2, period: 14},
    third: {weight: 1, period: 28},
    thresholds: {
        low: 30,
        high: 70,
        // How many candle intervals should a trend persist
        // before we consider it real?
        persistence: 1
    }
};

// CCI Settings
config.CCI = {
    constant: 0.015, // constant multiplier. 0.015 gets to around 70% fit
    history: 110, // history size, make same or smaller than history
    thresholds: {
        up: 180, // fixed values for overbuy upward trajectory
        down: -25, // fixed value for downward trajectory
        persistence: 0 // filter spikes by adding extra filters candles
    }
};

// StochRSI settings
config.StochRSI = {
    interval: 3,
    thresholds: {
        low: 20,
        high: 80,
        // How many candle intervals should a trend persist
        // before we consider it real?
        persistence: 3
    }
};


// custom settings:
config.custom = {
    my_custom_setting: 10,
};

config['talib-macd'] = {
    parameters: {
        optInFastPeriod: 10,
        optInSlowPeriod: 21,
        optInSignalPeriod: 9
    },
    thresholds: {
        down: -0.025,
        up: 0.025,
    }
};

config.neuralnet_zschro = {
    threshold_buy: 4.0,
    threshold_sell: -4.0,
    method: 'nesterov',
    learning_rate: 0.1,
    momentum: 0.95,
    decay: 0.10,
    stoploss_enabled: true,
    stoploss_threshold: 0.93,
    hodl_threshold: 1,
    price_buffer_len: 100,
    min_predictions: 1000
};

config.RSI_BULL_BEAR_ADX = {
  SMA_long: 138,
  SMA_short: 61,
  BULL_rsi: 11,
  BULL_high: 85,
  BULL_low: 49,
  BULL_mod_high: 1,
  BULL_mod_low: -3,
  BEAR_rsi: 10,
  BEAR_high: 40,
  BEAR_low: 15,
  BEAR_mod_high: 7,
  BEAR_mod_low: -2,
  ADX_adx: 8,
  ADX_high: 62,
  ADX_low: 48
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING PLUGINS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// do you want Gekko to simulate the profit of the strategy's own advice?
config.paperTrader = {
    enabled: false,
    // report the profit in the currency or the asset?
    reportInCurrency: true,
    // start balance, on what the current balance is compared with
    simulationBalance: {
        // these are in the unit types configured in the watcher.
        asset: 1,
        currency: 100,
    },
    // how much fee in % does each trade cost?
    feeMaker: 0.2,
    feeTaker: 0.2,
    feeUsing: 'maker',
    // how much slippage/spread should Gekko assume per trade?
    slippage: 0.05,
}

config.performanceAnalyzer = {
    enabled: true,
    riskFreeReturn: 5
}

// Want Gekko to perform real trades on buy or sell advice?
// Enabling this will activate trades for the market being
// watched by `config.watch`.
config.trader = {
    enabled: true,
    key: 'hP1wZjyFwnXYIDCyFlncrQrBYHh9axpzmJEf5FaLXK2',
    secret: '5mG692VZd2rvp1P4nXPjVjvGxwsuBHFyt1ezh0GmdXd',
    username: '', // your username, only required for specific exchanges.
    passphrase: '' // GDAX, requires a passphrase.
}

config.adviceLogger = {
    enabled: true,
    muteSoft: true // disable advice printout if it's soft
}

config.pushover = {
    enabled: false,
    sendPushoverOnStart: false,
    muteSoft: true, // disable advice printout if it's soft
    tag: '[GEKKO]',
    key: '',
    user: ''
}

// want Gekko to send a mail on buy or sell advice?
config.mailer = {
    enabled: true,       // Send Emails if true, false to turn off
    sendMailOnStart: true,    // Send 'Gekko starting' message if true, not if false

    email: 'info@stevehunt.ca',    // Your Gmail address
    muteSoft: true, // disable advice printout if it's soft

    // You don't have to set your password here, if you leave it blank we will ask it
    // when Gekko's starts.
    //
    // NOTE: Gekko is an open source project < https://github.com/askmike/gekko >,
    // make sure you looked at the code or trust the maintainer of this bot when you
    // fill in your email and password.
    //
    // WARNING: If you have NOT downloaded Gekko from the github page above we CANNOT
    // guarantuee that your email address & password are safe!

    password: 'R6Meh48j',       // Your Gmail Password - if not supplied Gekko will prompt on startup.

    tag: '[GEKKO IOT] ',      // Prefix all email subject lines with this

    //       ADVANCED MAIL SETTINGS
    // you can leave those as is if you
    // just want to use Gmail

    server: 'stevehunt.ca',   // The name of YOUR outbound (SMTP) mail server.
    smtpauth: true,     // Does SMTP server require authentication (true for Gmail)
    // The following 3 values default to the Email (above) if left blank
    user: 'info@stevehunt.ca',       // Your Email server user name - usually your full Email address 'me@mydomain.com'
    from: 'info@stevehunt.ca',       // 'me@mydomain.com'
    to: 'gekko@stevehunt.ca',       // 'me@somedomain.com, me@someotherdomain.com'
    ssl: false,        // Use SSL (true for Gmail)
    port: '25',       // Set if you don't want to use the default port
}

config.pushbullet = {
    // sends pushbullets if true
    enabled: false,
    // Send 'Gekko starting' message if true
    sendMessageOnStart: true,
    // disable advice printout if it's soft
    muteSoft: true,
    // your pushbullet API key
    key: 'xxx',
    // your email, change it unless you are Azor Ahai
    email: 'jon_snow@westeros.org',
    // will make Gekko messages start mit [GEKKO]
    tag: '[GEKKO]'
};

config.ircbot = {
    enabled: false,
    emitUpdates: false,
    muteSoft: true,
    channel: '#your-channel',
    server: 'irc.freenode.net',
    botName: 'gekkobot'
}

config.telegrambot = {
    enabled: true,
    emitUpdates: true,
    token: '595275776:AAFeevEQ6jOeY6evuvsxVqhE5zdBC-ADeU0',
    botName: 'capnk9GekkoIOTBot'
}

config.twitter = {
    // sends pushbullets if true
    enabled: false,
    // Send 'Gekko starting' message if true
    sendMessageOnStart: false,
    // disable advice printout if it's soft
    muteSoft: false,
    tag: '[GEKKO]',
    // twitter consumer key
    consumer_key: '',
    // twitter consumer secret
    consumer_secret: '',
    // twitter access token key
    access_token_key: '',
    // twitter access token secret
    access_token_secret: ''
};

config.xmppbot = {
    enabled: false,
    emitUpdates: false,
    client_id: 'jabber_id',
    client_pwd: 'jabber_pw',
    client_host: 'jabber_server',
    client_port: 5222,
    status_msg: 'I\'m online',
    receiver: 'jabber_id_for_updates'
}

config.campfire = {
    enabled: false,
    emitUpdates: false,
    nickname: 'Gordon',
    roomId: null,
    apiKey: '',
    account: ''
}

config.redisBeacon = {
    enabled: false,
    port: 6379, // redis default
    host: '127.0.0.1', // localhost
    // On default Gekko broadcasts
    // events in the channel with
    // the name of the event, set
    // an optional prefix to the
    // channel name.
    channelPrefix: '',
    broadcast: [
        'candle'
    ]
}

config.slack = {
    enabled: false,
    token: '',
    sendMessageOnStart: true,
    muteSoft: true,
    channel: '' // #tradebot
}

config.candleWriter = {
    enabled: true
}

config.adviceWriter = {
    enabled: true,
    muteSoft: true,
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING ADAPTER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

config.adapter = 'sqlite';

config.sqlite = {
    path: 'plugins/sqlite',

    dataDirectory: 'history',
    version: 0.1,

    dependencies: []
}

// Postgres adapter example config (please note: requires postgres >= 9.5):
config.postgresql = {
    path: 'plugins/postgresql',
    version: 0.1,
    connectionString: 'postgres://user:pass@localhost:5432', // if default port
    database: null, // if set, we'll put all tables into a single database.
    schema: 'public',
    dependencies: [{
        module: 'pg',
        version: '6.1.0'
    }]
}

// Mongodb adapter, requires mongodb >= 3.3 (no version earlier tested)
config.mongodb = {
    path: 'plugins/mongodb',
    version: 0.1,
    connectionString: 'mongodb://mongodb/gekko', // connection to mongodb server
    dependencies: [{
        module: 'mongojs',
        version: '2.4.0'
    }]
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING BACKTESTING
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Note that these settings are only used in backtesting mode, see here:
// @link: https://github.com/askmike/gekko/blob/stable/docs/Backtesting.md

config.backtest = {
    daterange: {
        from: "2018-05-01 00:01",
        to: "2018-05-18 17:21"
    },
    batchSize: 50
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING IMPORTING
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

config.importer = {
    daterange: {
        // NOTE: these dates are in UTC
        from: "2018-05-20 00:00:00"
    }
}

// set this to true if you understand that Gekko will
// invest according to how you configured the indicators.
// None of the advice in the output is Gekko telling you
// to take a certain position. Instead it is the result
// of running the indicators you configured automatically.
//
// In other words: Gekko automates your trading strategies,
// it doesn't advice on itself, only set to true if you truly
// understand this.
//
// Not sure? Read this first: https://github.com/askmike/gekko/issues/201
config['I understand that Gekko only automates MY OWN trading strategies'] = true;

module.exports = config;
