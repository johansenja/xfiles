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
cmd.version("0.0.1")
    .arguments("<url>")
    .description("XSD download and conversion tool")
    .option("-H, --force-host <host>", 'Fetch all xsd files from <host>\n    (original host is passed in GET parameter "host")')
    .option("-P, --force-port <port>", "Connect to <port> when using --force-host")
    // .option('-c, --cache-xsd <path>', 'Cache downloaded XSD filed under <path>')
    .option("-t, --out-ts <path>", "Output TypeScript definitions under <path>")
    .option("-j, --out-js <path>", "Output JavaScript modules under <path>")
    .action(handleConvert)
    .parse(process.argv);
if (process.argv.length < 3)
    cmd.help();
function handleConvert(urlRemote, opts) {
    var schemaContext = new schema.Context();
    var xsdContext = new Context_1.Context(schemaContext);
    var fetchOptions = {};
    if (opts["forceHost"]) {
        fetchOptions.forceHost = opts["forceHost"];
        if (opts["forcePort"])
            fetchOptions.forcePort = opts["forcePort"];
        cget_1.Cache.patchRequest();
    }
    var jsCache = new cget_1.Cache(opts["outJs"] || "xmlns", "_index.js");
    var tsCache = new cget_1.Cache(opts["outTs"] || "xmlns", "_index.d.ts");
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
            importsAdded
                .then(function () {
                // Rename types to valid JavaScript class names,
                // adding a prefix or suffix to duplicates.
                return sanitize.exec();
            })
                .then(function () { return sanitize.finish(); })
                .then(function () { return addImports.finish(importsAdded.value()); })
                .then(function () { return new schema.exporter.JS(spec, jsCache).exec(); })
                .then(function () { return new schema.exporter.TS(spec, tsCache).exec(); });
        }
        catch (err) {
            console.error(err);
            console.log("Stack:");
            console.error(err.stack);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMvY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvRUFBb0U7QUFDcEUsK0NBQStDOztBQUUvQywrQkFBaUM7QUFFakMsNkJBQTJDO0FBRzNDLHlDQUF3QztBQUV4Qyx1Q0FBc0M7QUFDdEMsMkNBQWlEO0FBQ2pELGlDQUFtQztBQUNuQyw0REFBMkQ7QUFDM0Qsd0RBQXVEO0FBT3RELEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFjO0tBQy9CLFNBQVMsQ0FBQyxPQUFPLENBQUM7S0FDbEIsV0FBVyxDQUFDLGtDQUFrQyxDQUFDO0tBQy9DLE1BQU0sQ0FDTCx5QkFBeUIsRUFDekIsd0ZBQXdGLENBQ3pGO0tBQ0EsTUFBTSxDQUNMLHlCQUF5QixFQUN6QiwyQ0FBMkMsQ0FDNUM7SUFDRCwrRUFBK0U7S0FDOUUsTUFBTSxDQUFDLHFCQUFxQixFQUFFLDRDQUE0QyxDQUFDO0tBQzNFLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSx3Q0FBd0MsQ0FBQztLQUN2RSxNQUFNLENBQUMsYUFBYSxDQUFDO0tBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFdkIsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDO0lBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBRXhDLFNBQVMsYUFBYSxDQUFDLFNBQWlCLEVBQUUsSUFBNEI7SUFDcEUsSUFBSSxhQUFhLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDekMsSUFBSSxVQUFVLEdBQUcsSUFBSSxpQkFBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRTVDLElBQUksWUFBWSxHQUFpQixFQUFFLENBQUM7SUFFcEMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDckIsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0MsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQUUsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFbEUsWUFBSyxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3RCO0lBRUQsSUFBSSxPQUFPLEdBQUcsSUFBSSxZQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUMvRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFlBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBRWpFLElBQUksTUFBTSxHQUFHLElBQUksZUFBTSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUVsRCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFNBQW9CO1FBQ2pELElBQUk7WUFDRiwwQkFBZSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDMUQsMEJBQWUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRXBELElBQUksSUFBSSxHQUFHLDBCQUFlLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRXJELElBQUksVUFBVSxHQUFHLElBQUksdUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QyxJQUFJLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFbEMsSUFBSSxZQUFZLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRXJDLCtEQUErRDtZQUMvRCxZQUFZO2lCQUNULElBQUksQ0FBQztnQkFDSixnREFBZ0Q7Z0JBQ2hELDJDQUEyQztnQkFDM0MsT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQWYsQ0FBZSxDQUNoQjtpQkFDQSxJQUFJLENBQUMsY0FBTSxPQUFBLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQztpQkFDN0IsSUFBSSxDQUFDLGNBQU0sT0FBQSxVQUFVLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUF2QyxDQUF1QyxDQUFDO2lCQUNuRCxJQUFJLENBQUMsY0FBTSxPQUFBLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUE1QyxDQUE0QyxDQUFDO2lCQUN4RCxJQUFJLENBQUMsY0FBTSxPQUFBLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUE1QyxDQUE0QyxDQUFDLENBQUM7U0FDN0Q7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4c2QsIGNvcHlyaWdodCAoYykgMjAxNS0yMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuXG5pbXBvcnQgKiBhcyBjbWQgZnJvbSBcImNvbW1hbmRlclwiO1xuXG5pbXBvcnQgeyBDYWNoZSwgRmV0Y2hPcHRpb25zIH0gZnJvbSBcImNnZXRcIjtcbmltcG9ydCAqIGFzIGN4bWwgZnJvbSBcIi4uLy4uL3J1bnRpbWVfcGFyc2VyXCI7XG5cbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwiLi94c2QvQ29udGV4dFwiO1xuaW1wb3J0IHsgTmFtZXNwYWNlIH0gZnJvbSBcIi4veHNkL05hbWVzcGFjZVwiO1xuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcIi4veHNkL0xvYWRlclwiO1xuaW1wb3J0IHsgZXhwb3J0TmFtZXNwYWNlIH0gZnJvbSBcIi4veHNkL0V4cG9ydGVyXCI7XG5pbXBvcnQgKiBhcyBzY2hlbWEgZnJvbSBcIi4vc2NoZW1hXCI7XG5pbXBvcnQgeyBBZGRJbXBvcnRzIH0gZnJvbSBcIi4vc2NoZW1hL3RyYW5zZm9ybS9BZGRJbXBvcnRzXCI7XG5pbXBvcnQgeyBTYW5pdGl6ZSB9IGZyb20gXCIuL3NjaGVtYS90cmFuc2Zvcm0vU2FuaXRpemVcIjtcblxudHlwZSBfSUNvbW1hbmQgPSB0eXBlb2YgY21kO1xuaW50ZXJmYWNlIElDb21tYW5kIGV4dGVuZHMgX0lDb21tYW5kIHtcbiAgYXJndW1lbnRzKHNwZWM6IHN0cmluZyk6IElDb21tYW5kO1xufVxuXG4oY21kLnZlcnNpb24oXCIwLjAuMVwiKSBhcyBJQ29tbWFuZClcbiAgLmFyZ3VtZW50cyhcIjx1cmw+XCIpXG4gIC5kZXNjcmlwdGlvbihcIlhTRCBkb3dubG9hZCBhbmQgY29udmVyc2lvbiB0b29sXCIpXG4gIC5vcHRpb24oXG4gICAgXCItSCwgLS1mb3JjZS1ob3N0IDxob3N0PlwiLFxuICAgICdGZXRjaCBhbGwgeHNkIGZpbGVzIGZyb20gPGhvc3Q+XFxuICAgIChvcmlnaW5hbCBob3N0IGlzIHBhc3NlZCBpbiBHRVQgcGFyYW1ldGVyIFwiaG9zdFwiKSdcbiAgKVxuICAub3B0aW9uKFxuICAgIFwiLVAsIC0tZm9yY2UtcG9ydCA8cG9ydD5cIixcbiAgICBcIkNvbm5lY3QgdG8gPHBvcnQ+IHdoZW4gdXNpbmcgLS1mb3JjZS1ob3N0XCJcbiAgKVxuICAvLyAub3B0aW9uKCctYywgLS1jYWNoZS14c2QgPHBhdGg+JywgJ0NhY2hlIGRvd25sb2FkZWQgWFNEIGZpbGVkIHVuZGVyIDxwYXRoPicpXG4gIC5vcHRpb24oXCItdCwgLS1vdXQtdHMgPHBhdGg+XCIsIFwiT3V0cHV0IFR5cGVTY3JpcHQgZGVmaW5pdGlvbnMgdW5kZXIgPHBhdGg+XCIpXG4gIC5vcHRpb24oXCItaiwgLS1vdXQtanMgPHBhdGg+XCIsIFwiT3V0cHV0IEphdmFTY3JpcHQgbW9kdWxlcyB1bmRlciA8cGF0aD5cIilcbiAgLmFjdGlvbihoYW5kbGVDb252ZXJ0KVxuICAucGFyc2UocHJvY2Vzcy5hcmd2KTtcblxuaWYgKHByb2Nlc3MuYXJndi5sZW5ndGggPCAzKSBjbWQuaGVscCgpO1xuXG5mdW5jdGlvbiBoYW5kbGVDb252ZXJ0KHVybFJlbW90ZTogc3RyaW5nLCBvcHRzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XG4gIHZhciBzY2hlbWFDb250ZXh0ID0gbmV3IHNjaGVtYS5Db250ZXh0KCk7XG4gIHZhciB4c2RDb250ZXh0ID0gbmV3IENvbnRleHQoc2NoZW1hQ29udGV4dCk7XG5cbiAgdmFyIGZldGNoT3B0aW9uczogRmV0Y2hPcHRpb25zID0ge307XG5cbiAgaWYgKG9wdHNbXCJmb3JjZUhvc3RcIl0pIHtcbiAgICBmZXRjaE9wdGlvbnMuZm9yY2VIb3N0ID0gb3B0c1tcImZvcmNlSG9zdFwiXTtcbiAgICBpZiAob3B0c1tcImZvcmNlUG9ydFwiXSkgZmV0Y2hPcHRpb25zLmZvcmNlUG9ydCA9IG9wdHNbXCJmb3JjZVBvcnRcIl07XG5cbiAgICBDYWNoZS5wYXRjaFJlcXVlc3QoKTtcbiAgfVxuXG4gIHZhciBqc0NhY2hlID0gbmV3IENhY2hlKG9wdHNbXCJvdXRKc1wiXSB8fCBcInhtbG5zXCIsIFwiX2luZGV4LmpzXCIpO1xuICB2YXIgdHNDYWNoZSA9IG5ldyBDYWNoZShvcHRzW1wib3V0VHNcIl0gfHwgXCJ4bWxuc1wiLCBcIl9pbmRleC5kLnRzXCIpO1xuXG4gIHZhciBsb2FkZXIgPSBuZXcgTG9hZGVyKHhzZENvbnRleHQsIGZldGNoT3B0aW9ucyk7XG5cbiAgbG9hZGVyLmltcG9ydCh1cmxSZW1vdGUpLnRoZW4oKG5hbWVzcGFjZTogTmFtZXNwYWNlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGV4cG9ydE5hbWVzcGFjZSh4c2RDb250ZXh0LnByaW1pdGl2ZVNwYWNlLCBzY2hlbWFDb250ZXh0KTtcbiAgICAgIGV4cG9ydE5hbWVzcGFjZSh4c2RDb250ZXh0LnhtbFNwYWNlLCBzY2hlbWFDb250ZXh0KTtcblxuICAgICAgdmFyIHNwZWMgPSBleHBvcnROYW1lc3BhY2UobmFtZXNwYWNlLCBzY2hlbWFDb250ZXh0KTtcblxuICAgICAgdmFyIGFkZEltcG9ydHMgPSBuZXcgQWRkSW1wb3J0cyhzcGVjKTtcbiAgICAgIHZhciBzYW5pdGl6ZSA9IG5ldyBTYW5pdGl6ZShzcGVjKTtcblxuICAgICAgdmFyIGltcG9ydHNBZGRlZCA9IGFkZEltcG9ydHMuZXhlYygpO1xuXG4gICAgICAvLyBGaW5kIElEIG51bWJlcnMgb2YgYWxsIHR5cGVzIGltcG9ydGVkIGZyb20gb3RoZXIgbmFtZXNwYWNlcy5cbiAgICAgIGltcG9ydHNBZGRlZFxuICAgICAgICAudGhlbigoKSA9PlxuICAgICAgICAgIC8vIFJlbmFtZSB0eXBlcyB0byB2YWxpZCBKYXZhU2NyaXB0IGNsYXNzIG5hbWVzLFxuICAgICAgICAgIC8vIGFkZGluZyBhIHByZWZpeCBvciBzdWZmaXggdG8gZHVwbGljYXRlcy5cbiAgICAgICAgICBzYW5pdGl6ZS5leGVjKClcbiAgICAgICAgKVxuICAgICAgICAudGhlbigoKSA9PiBzYW5pdGl6ZS5maW5pc2goKSlcbiAgICAgICAgLnRoZW4oKCkgPT4gYWRkSW1wb3J0cy5maW5pc2goaW1wb3J0c0FkZGVkLnZhbHVlKCkpKVxuICAgICAgICAudGhlbigoKSA9PiBuZXcgc2NoZW1hLmV4cG9ydGVyLkpTKHNwZWMsIGpzQ2FjaGUpLmV4ZWMoKSlcbiAgICAgICAgLnRoZW4oKCkgPT4gbmV3IHNjaGVtYS5leHBvcnRlci5UUyhzcGVjLCB0c0NhY2hlKS5leGVjKCkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgY29uc29sZS5sb2coXCJTdGFjazpcIik7XG4gICAgICBjb25zb2xlLmVycm9yKGVyci5zdGFjayk7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==