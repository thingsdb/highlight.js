/*
Language: SiriDB
Author: Jeroen van der Heijden <jeroen@cesbit.com>
Category: common
Website: https://siridb.net
*/

export default function(hljs) {

    var COMMENTS = {
        className: 'doc',
        variants: [
            hljs.HASH_COMMENT_MODE,
        ]
    };

    var NUMBERS = {
        className: 'number',
        variants: [
          { begin: /[-+]?0b[01]+/ },
          { begin: /[-+]?0o[0-8]+/ },
          { begin: /([-+]?0x[0-9a-fA-F]+)/ },
          { begin: /[-+]?((inf|nan)([^0-9A-Za-z_]|$)|[0-9]*\.[0-9]+(e[+-][0-9]+)?)/ },
          { begin: /[-+]?[0-9]+(w|d|h|m|s)?/ }
        ],
        relevance: 0
    };

    var REGEXP = {
        className: 'regexp',
        begin: new RegExp('(/[^/\\\\\\n]+(?:\\\\.[^/\\\\]*)*/i?)'),
        relevance: 0,
      }

    var SUBST = {
        className: 'subst',
        begin: /\{/, end: /\}/,
    };

    var LITERAL_BRACKET = {
        begin: /\{\{/,
        relevance: 0
    };

    var STRINGS = {
        className: 'string',
        variants: [
          {
            begin: '\'', end: '\'',
            contains: [],
            relevance: 10
          },
          {
            begin: '"', end: '"',
            contains: [],
            relevance: 10
          },
          {
            begin: '`', end: '`',
            contains: [LITERAL_BRACKET, SUBST],
            relevance: 10
          },
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE
        ]
    };

    return {
        name: 'SiriDB',
        contains: [
            COMMENTS,
            STRINGS,
            NUMBERS,
            REGEXP,
            {
                className: 'function',
                begin: new RegExp(
                    '\\b(' +
                    'count|derivative|difference|filter|first|interval|' +
                    'last|limit|max|mean|median|median_high|\median_low|min|pvariance|' +
                    'offset|stddev|sum|timeval|variance)\\s*(?=\\()'
                ),
            },
        ],
        keywords: {
            keyword:
                'timeit alter count create drop list select grant revoke ' +
                'from between before after head tail and or merge as using where set to',
            literal:
                'true false all now debug info warning error critical read write full',
            built_in:
                'database server servers shard shards series pool pools group groups tag tags ' +
                'access name active_handles time_precision received_points selected_points ' +
                'sync_progress tee timezone uptime reindex_progress ' +
                'open_files mem_usage max_open_files log_level idle_time idle_percentage ' +
                'fifo_files active_tasks status shard_duration startup_time online version ' +
                'uuid port libuv ip_support dbpath buffer_size buffer_path address ' +
                'backup_mode start end size ignore_threshold user users password'
        }
    };
}
