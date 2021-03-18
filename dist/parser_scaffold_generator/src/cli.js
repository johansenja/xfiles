"use strict";
// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
var cmd = require("commander");
var cget_1 = require("cget");
var Context_1 = require("./xsd/Context");
var Loader_1 = require("./xsd/Loader");
var Exporter_1 = require("./xsd/Exporter");
var schema = require("./schema");
var AddImports_1 = require("./schema/transform/AddImports");
var Sanitize_1 = require("./schema/transform/Sanitize");
(cmd.version(require('../package.json').version)
    .arguments('<url>')
    .description('XSD download and conversion tool')
    .option('-H, --force-host <host>', 'Fetch all xsd files from <host>\n    (original host is passed in GET parameter "host")')
    .option('-P, --force-port <port>', 'Connect to <port> when using --force-host')
    // .option('-c, --cache-xsd <path>', 'Cache downloaded XSD filed under <path>')
    .option('-t, --out-ts <path>', 'Output TypeScript definitions under <path>')
    .option('-j, --out-js <path>', 'Output JavaScript modules under <path>')
    .action(handleConvert)
    .parse(process.argv));
if (process.argv.length < 3)
    cmd.help();
function handleConvert(urlRemote, opts) {
    var schemaContext = new schema.Context();
    var xsdContext = new Context_1.Context(schemaContext);
    var fetchOptions = {};
    if (opts['forceHost']) {
        fetchOptions.forceHost = opts['forceHost'];
        if (opts['forcePort'])
            fetchOptions.forcePort = opts['forcePort'];
        cget_1.Cache.patchRequest();
    }
    var jsCache = new cget_1.Cache(opts['outJs'] || 'xmlns', '_index.js');
    var tsCache = new cget_1.Cache(opts['outTs'] || 'xmlns', '_index.d.ts');
    var loader = new Loader_1.Loader(xsdContext, fetchOptions);
    loader.import(urlRemote).then(function (namespace) {
        try {
            Exporter_1.exportNamespace(xsdContext.primitiveSpace, schemaContext);
            Exporter_1.exportNamespace(xsdContext.xmlSpace, schemaContext);
            var spec = Exporter_1.exportNamespace(namespace, schemaContext);
            var addImports = new AddImports_1.AddImports(spec);
            var sanitize = new Sanitize_1.Sanitize(spec);
            var importsAdded = addImports.exec();
            // Find ID numbers of all types imported from other namespaces.
            importsAdded.then(function () {
                // Rename types to valid JavaScript class names,
                // adding a prefix or suffix to duplicates.
                return sanitize.exec();
            }).then(function () {
                return sanitize.finish();
            }).then(function () {
                return addImports.finish(importsAdded.value());
            }).then(function () {
                return new schema.exporter.JS(spec, jsCache).exec();
            }).then(function () {
                return new schema.exporter.TS(spec, tsCache).exec();
            });
        }
        catch (err) {
            console.error(err);
            console.log('Stack:');
            console.error(err.stack);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMvY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvRUFBb0U7QUFDcEUsK0NBQStDOztBQUUvQywrQkFBaUM7QUFFakMsNkJBQXlDO0FBR3pDLHlDQUFzQztBQUV0Qyx1Q0FBb0M7QUFDcEMsMkNBQStDO0FBQy9DLGlDQUFtQztBQUNuQyw0REFBeUQ7QUFDekQsd0RBQXFEO0FBT3JELENBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxPQUFPLENBQWM7S0FDNUQsU0FBUyxDQUFDLE9BQU8sQ0FBQztLQUNsQixXQUFXLENBQUMsa0NBQWtDLENBQUM7S0FDL0MsTUFBTSxDQUFDLHlCQUF5QixFQUFFLHdGQUF3RixDQUFDO0tBQzNILE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSwyQ0FBMkMsQ0FBQztJQUMvRSwrRUFBK0U7S0FDOUUsTUFBTSxDQUFDLHFCQUFxQixFQUFFLDRDQUE0QyxDQUFDO0tBQzNFLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSx3Q0FBd0MsQ0FBQztLQUN2RSxNQUFNLENBQUMsYUFBYSxDQUFDO0tBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQ3BCLENBQUM7QUFFRixJQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7SUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7QUFFdkMsU0FBUyxhQUFhLENBQUMsU0FBaUIsRUFBRSxJQUE0QjtJQUNyRSxJQUFJLGFBQWEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN6QyxJQUFJLFVBQVUsR0FBRyxJQUFJLGlCQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFNUMsSUFBSSxZQUFZLEdBQWlCLEVBQUUsQ0FBQztJQUVwQyxJQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUNyQixZQUFZLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzQyxJQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFBRSxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVqRSxZQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDckI7SUFFRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFlBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQy9ELElBQUksT0FBTyxHQUFHLElBQUksWUFBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFFakUsSUFBSSxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBRWxELE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsU0FBb0I7UUFDbEQsSUFBSTtZQUNILDBCQUFlLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUMxRCwwQkFBZSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFcEQsSUFBSSxJQUFJLEdBQUcsMEJBQWUsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFckQsSUFBSSxVQUFVLEdBQUcsSUFBSSx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLElBQUksUUFBUSxHQUFHLElBQUksbUJBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVsQyxJQUFJLFlBQVksR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFckMsK0RBQStEO1lBQy9ELFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQ2pCLGdEQUFnRDtnQkFDaEQsMkNBQTJDO2dCQUMzQyxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFBZixDQUFlLENBQ2YsQ0FBQyxJQUFJLENBQUM7Z0JBQ04sT0FBQSxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQWpCLENBQWlCLENBQ2pCLENBQUMsSUFBSSxDQUFDO2dCQUNOLE9BQUEsVUFBVSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7WUFBdkMsQ0FBdUMsQ0FDdkMsQ0FBQyxJQUFJLENBQUM7Z0JBQ04sT0FBQSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFBNUMsQ0FBNEMsQ0FDNUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ04sT0FBQSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFBNUMsQ0FBNEMsQ0FDNUMsQ0FBQztTQUNGO1FBQUMsT0FBTSxHQUFHLEVBQUU7WUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7SUFDRixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeHNkLCBjb3B5cmlnaHQgKGMpIDIwMTUtMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0ICogYXMgY21kIGZyb20gJ2NvbW1hbmRlcic7XG5cbmltcG9ydCB7Q2FjaGUsIEZldGNoT3B0aW9uc30gZnJvbSAnY2dldCc7XG5pbXBvcnQgKiBhcyBjeG1sIGZyb20gXCIuLi8uLi9ydW50aW1lX3BhcnNlclwiO1xuXG5pbXBvcnQge0NvbnRleHR9IGZyb20gJy4veHNkL0NvbnRleHQnO1xuaW1wb3J0IHtOYW1lc3BhY2V9IGZyb20gJy4veHNkL05hbWVzcGFjZSc7XG5pbXBvcnQge0xvYWRlcn0gZnJvbSAnLi94c2QvTG9hZGVyJztcbmltcG9ydCB7ZXhwb3J0TmFtZXNwYWNlfSBmcm9tICcuL3hzZC9FeHBvcnRlcic7XG5pbXBvcnQgKiBhcyBzY2hlbWEgZnJvbSAnLi9zY2hlbWEnO1xuaW1wb3J0IHtBZGRJbXBvcnRzfSBmcm9tICcuL3NjaGVtYS90cmFuc2Zvcm0vQWRkSW1wb3J0cyc7XG5pbXBvcnQge1Nhbml0aXplfSBmcm9tICcuL3NjaGVtYS90cmFuc2Zvcm0vU2FuaXRpemUnO1xuXG50eXBlIF9JQ29tbWFuZCA9IHR5cGVvZiBjbWQ7XG5pbnRlcmZhY2UgSUNvbW1hbmQgZXh0ZW5kcyBfSUNvbW1hbmQge1xuXHRhcmd1bWVudHMoc3BlYzogc3RyaW5nKTogSUNvbW1hbmQ7XG59XG5cbigoY21kLnZlcnNpb24ocmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJykudmVyc2lvbikgYXMgSUNvbW1hbmQpXG5cdC5hcmd1bWVudHMoJzx1cmw+Jylcblx0LmRlc2NyaXB0aW9uKCdYU0QgZG93bmxvYWQgYW5kIGNvbnZlcnNpb24gdG9vbCcpXG5cdC5vcHRpb24oJy1ILCAtLWZvcmNlLWhvc3QgPGhvc3Q+JywgJ0ZldGNoIGFsbCB4c2QgZmlsZXMgZnJvbSA8aG9zdD5cXG4gICAgKG9yaWdpbmFsIGhvc3QgaXMgcGFzc2VkIGluIEdFVCBwYXJhbWV0ZXIgXCJob3N0XCIpJylcblx0Lm9wdGlvbignLVAsIC0tZm9yY2UtcG9ydCA8cG9ydD4nLCAnQ29ubmVjdCB0byA8cG9ydD4gd2hlbiB1c2luZyAtLWZvcmNlLWhvc3QnKVxuXHQvLyAub3B0aW9uKCctYywgLS1jYWNoZS14c2QgPHBhdGg+JywgJ0NhY2hlIGRvd25sb2FkZWQgWFNEIGZpbGVkIHVuZGVyIDxwYXRoPicpXG5cdC5vcHRpb24oJy10LCAtLW91dC10cyA8cGF0aD4nLCAnT3V0cHV0IFR5cGVTY3JpcHQgZGVmaW5pdGlvbnMgdW5kZXIgPHBhdGg+Jylcblx0Lm9wdGlvbignLWosIC0tb3V0LWpzIDxwYXRoPicsICdPdXRwdXQgSmF2YVNjcmlwdCBtb2R1bGVzIHVuZGVyIDxwYXRoPicpXG5cdC5hY3Rpb24oaGFuZGxlQ29udmVydClcblx0LnBhcnNlKHByb2Nlc3MuYXJndilcbik7XG5cbmlmKHByb2Nlc3MuYXJndi5sZW5ndGggPCAzKSBjbWQuaGVscCgpO1xuXG5mdW5jdGlvbiBoYW5kbGVDb252ZXJ0KHVybFJlbW90ZTogc3RyaW5nLCBvcHRzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XG5cdHZhciBzY2hlbWFDb250ZXh0ID0gbmV3IHNjaGVtYS5Db250ZXh0KCk7XG5cdHZhciB4c2RDb250ZXh0ID0gbmV3IENvbnRleHQoc2NoZW1hQ29udGV4dCk7XG5cblx0dmFyIGZldGNoT3B0aW9uczogRmV0Y2hPcHRpb25zID0ge307XG5cblx0aWYob3B0c1snZm9yY2VIb3N0J10pIHtcblx0XHRmZXRjaE9wdGlvbnMuZm9yY2VIb3N0ID0gb3B0c1snZm9yY2VIb3N0J107XG5cdFx0aWYob3B0c1snZm9yY2VQb3J0J10pIGZldGNoT3B0aW9ucy5mb3JjZVBvcnQgPSBvcHRzWydmb3JjZVBvcnQnXTtcblxuXHRcdENhY2hlLnBhdGNoUmVxdWVzdCgpO1xuXHR9XG5cblx0dmFyIGpzQ2FjaGUgPSBuZXcgQ2FjaGUob3B0c1snb3V0SnMnXSB8fCAneG1sbnMnLCAnX2luZGV4LmpzJyk7XG5cdHZhciB0c0NhY2hlID0gbmV3IENhY2hlKG9wdHNbJ291dFRzJ10gfHwgJ3htbG5zJywgJ19pbmRleC5kLnRzJyk7XG5cblx0dmFyIGxvYWRlciA9IG5ldyBMb2FkZXIoeHNkQ29udGV4dCwgZmV0Y2hPcHRpb25zKTtcblxuXHRsb2FkZXIuaW1wb3J0KHVybFJlbW90ZSkudGhlbigobmFtZXNwYWNlOiBOYW1lc3BhY2UpID0+IHtcblx0XHR0cnkge1xuXHRcdFx0ZXhwb3J0TmFtZXNwYWNlKHhzZENvbnRleHQucHJpbWl0aXZlU3BhY2UsIHNjaGVtYUNvbnRleHQpO1xuXHRcdFx0ZXhwb3J0TmFtZXNwYWNlKHhzZENvbnRleHQueG1sU3BhY2UsIHNjaGVtYUNvbnRleHQpO1xuXG5cdFx0XHR2YXIgc3BlYyA9IGV4cG9ydE5hbWVzcGFjZShuYW1lc3BhY2UsIHNjaGVtYUNvbnRleHQpO1xuXG5cdFx0XHR2YXIgYWRkSW1wb3J0cyA9IG5ldyBBZGRJbXBvcnRzKHNwZWMpO1xuXHRcdFx0dmFyIHNhbml0aXplID0gbmV3IFNhbml0aXplKHNwZWMpO1xuXG5cdFx0XHR2YXIgaW1wb3J0c0FkZGVkID0gYWRkSW1wb3J0cy5leGVjKCk7XG5cblx0XHRcdC8vIEZpbmQgSUQgbnVtYmVycyBvZiBhbGwgdHlwZXMgaW1wb3J0ZWQgZnJvbSBvdGhlciBuYW1lc3BhY2VzLlxuXHRcdFx0aW1wb3J0c0FkZGVkLnRoZW4oKCkgPT5cblx0XHRcdFx0Ly8gUmVuYW1lIHR5cGVzIHRvIHZhbGlkIEphdmFTY3JpcHQgY2xhc3MgbmFtZXMsXG5cdFx0XHRcdC8vIGFkZGluZyBhIHByZWZpeCBvciBzdWZmaXggdG8gZHVwbGljYXRlcy5cblx0XHRcdFx0c2FuaXRpemUuZXhlYygpXG5cdFx0XHQpLnRoZW4oKCkgPT5cblx0XHRcdFx0c2FuaXRpemUuZmluaXNoKClcblx0XHRcdCkudGhlbigoKSA9PlxuXHRcdFx0XHRhZGRJbXBvcnRzLmZpbmlzaChpbXBvcnRzQWRkZWQudmFsdWUoKSlcblx0XHRcdCkudGhlbigoKSA9PlxuXHRcdFx0XHRuZXcgc2NoZW1hLmV4cG9ydGVyLkpTKHNwZWMsIGpzQ2FjaGUpLmV4ZWMoKVxuXHRcdFx0KS50aGVuKCgpID0+XG5cdFx0XHRcdG5ldyBzY2hlbWEuZXhwb3J0ZXIuVFMoc3BlYywgdHNDYWNoZSkuZXhlYygpXG5cdFx0XHQpO1xuXHRcdH0gY2F0Y2goZXJyKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cdFx0XHRjb25zb2xlLmxvZygnU3RhY2s6Jyk7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVyci5zdGFjayk7XG5cdFx0fVxuXHR9KTtcbn1cbiJdfQ==