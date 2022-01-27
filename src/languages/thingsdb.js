/*
Language: ThingsDB
Author: Jeroen van der Heijden <jeroen@transceptor.technology>
Category: common, scripting
Website: https://thingsdb.net
*/

export default function(hljs) {

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

    var NUMBERS = {
      className: 'number',
      variants: [
        { begin: /[-+]?0b[01]+/ },
        { begin: /[-+]?0o[0-8]+/ },
        { begin: /([-+]?0x[0-9a-fA-F]+)/ },
        { begin: /[-+]?[0-9]+/ },
        { begin: /[-+]?((inf|nan)([^0-9A-Za-z_]|$)|[0-9]*\.[0-9]+(e[+-][0-9]+)?)/ },
      ],
      relevance: 0
    };

    var COMMENTS = {
        className: 'doc',
        variants: [
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE
        ]
    };

    var REGEXP = {
        className: 'regexp',
        begin: new RegExp('(/[^/\\\\\\n]+(?:\\\\.[^/\\\\]*)*/i?)'),
        relevance: 0,
    }

    return {
        aliases: ['ti'],
        contains: [
            COMMENTS,
            STRINGS,
            NUMBERS,
            REGEXP,
            {
                className: 'symbol',
                begin: /#[0-9]+/
            },
            {
                className: 'literal',
                beginKeywords: 'true false nil'
            },
            {
                className: 'keyword',
                beginKeywords: 'if else return for in break continue'
            },
            {
                className: 'function',
                begin: new RegExp(
                    '\\b(' +
                    /* collection functions */
                    'alt_raise|assert|base64_encode|base64_decode|bool|bytes|room|' +
                    'datetime|deep|del_enum|del_type|enum|enum_info|enums_info|err|change_id|float|has_enum|has_type|int|is_array|' +
                    'is_ascii|is_bool|is_bytes|is_closure|is_datetime|is_enum|is_err|is_float|is_inf|is_int|is_room|is_task|is_time_zone|' +
                    'is_list|is_mpdata|is_nan|is_nil|is_raw|is_regex|is_set|is_str|is_thing|is_timeval|is_tuple|' +
                    'is_utf8|task|tasks|json_dump|json_load|regex|list|mod_enum|mod_type|new|new_type|now|raise|rand|range|' +
                    'randint|randstr|refs|log|rename_enum|rename_type|set|set_enum|set_type|str|thing|try|type|' +
                    'future|is_future|timeval|type_assert|type_count|type_info|types_info|wse|' +
                    /* node functions */
                    'backup_info|backups_info|counters|del_backup|' +
                    'has_backup|new_backup|node_info|nodes_info|' +
                    'reset_counters|restart_module|set_log_level|shutdown|' +
                    /* thingsdb functions */
                    'collection_info|collections_info|del_collection|' +
                    'del_expired|del_node|del_token|del_user|grant|' +
                    'has_collection|has_node|has_token|has_user|' +
                    'new_collection|new_node|new_token|new_user|' +
                    'refresh_module|rename_collection|rename_user|restore|revoke|set_password|set_time_zone|set_default_deep|' +
                    'time_zones_info|user_info|users_info|' +
                    'has_module|del_module|module_info|modules_info|new_module|deploy_module|rename_module|set_module_conf|set_module_scope|' +
                    /* procedure functions */
                    'del_procedure|has_procedure|new_procedure|rename_procedure|' +
                    'procedure_doc|procedure_info|procedures_info|run|' +
                    /* error functions */
                    'assert_err|auth_err|bad_data_err|cancelled_err|forbidden_err|' +
                    'lookup_err|max_quota_err|node_err|num_arguments_err|' +
                    'operation_err|overflow_err|syntax_err|type_err|' +
                    'value_err|zero_div_err' +
                    /* end */
                    ')\\s*(?=\\()'
                )
            },
            {
                className: 'function',
                begin: new RegExp(
                    '\\.\\s*(assign|args|set_args|len|load|call|choice|closure|set_closure|copy|dup|join|doc|emit|code|msg|each|every|extend|extend_unique|filter|find|' +
                    'find_index|index_of|map|name|owner|set_owner|pop|push|remove|replace|reverse|restrict|restriction|split|sort|splice|unique|is_unique|' +
                    'at|again_in|again_at|cancel|add|err|clear|has|contains|ends_with|lower|starts_with|test|trim|trim_left|trim_right|upper|' +
                    'del|to_type|get|id|keys|reduce|set|shift|some|value|values|wrap|unshift|unwrap|' +
                    'extract|first|last|equals|then|else|format|move|to|week|weekday|yday|zone)\\s*(?=\\()'
                ),
            },
            {
                className: 'attr',
                begin: /\.[A-Za-z_][0-9A-Za-z_]*/
            },
            {
                className: 'variable',
                begin: /[A-Za-z_][0-9A-Za-z_]*/
            },
        ],
    };
}
