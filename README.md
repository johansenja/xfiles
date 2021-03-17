# X-Files

Parse XSD files to create an XML parser scaffold, which can then be used to parse XML files at runtime.
The parser scaffold generator also generates .d.ts files to provide Typescript support.

## Structure

The project is split up into its 2 main parts: the runtime XML parser (in `./runtime_parser`; formerly [cxml](https://github.com/charto/cxml/)), and the
parser generator for parsing XSD files (in `./parser_scaffold_generator`; formerly [cxsd](https://github.com/charto/cxsd/)).
