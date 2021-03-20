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
function handleConvert(filePath, opts) {
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
    var namespace = loader.import(filePath);
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMvY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvRUFBb0U7QUFDcEUsK0NBQStDOztBQUUvQywrQkFBaUM7QUFFakMsNkJBQTJDO0FBRzNDLHlDQUF3QztBQUV4Qyx1Q0FBc0M7QUFDdEMsMkNBQWlEO0FBQ2pELGlDQUFtQztBQUNuQyw0REFBMkQ7QUFDM0Qsd0RBQXVEO0FBT3RELEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFjO0tBQy9CLFNBQVMsQ0FBQyxPQUFPLENBQUM7S0FDbEIsV0FBVyxDQUFDLGtDQUFrQyxDQUFDO0tBQy9DLE1BQU0sQ0FDTCx5QkFBeUIsRUFDekIsd0ZBQXdGLENBQ3pGO0tBQ0EsTUFBTSxDQUNMLHlCQUF5QixFQUN6QiwyQ0FBMkMsQ0FDNUM7SUFDRCwrRUFBK0U7S0FDOUUsTUFBTSxDQUFDLHFCQUFxQixFQUFFLDRDQUE0QyxDQUFDO0tBQzNFLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSx3Q0FBd0MsQ0FBQztLQUN2RSxNQUFNLENBQUMsYUFBYSxDQUFDO0tBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFdkIsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDO0lBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBRXhDLFNBQVMsYUFBYSxDQUFDLFFBQWdCLEVBQUUsSUFBNEI7SUFDbkUsSUFBSSxhQUFhLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDekMsSUFBSSxVQUFVLEdBQUcsSUFBSSxpQkFBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRTVDLElBQUksWUFBWSxHQUFpQixFQUFFLENBQUM7SUFFcEMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDckIsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0MsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQUUsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFbEUsWUFBSyxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3RCO0lBRUQsSUFBSSxPQUFPLEdBQUcsSUFBSSxZQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUMvRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFlBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBRWpFLElBQUksTUFBTSxHQUFHLElBQUksZUFBTSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUVsRCxJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLElBQUk7UUFDRiwwQkFBZSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDMUQsMEJBQWUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXBELElBQUksSUFBSSxHQUFHLDBCQUFlLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXJELElBQUksVUFBVSxHQUFHLElBQUksdUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEMsSUFBSSxZQUFZLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXJDLCtEQUErRDtRQUMvRCxZQUFZO2FBQ1QsSUFBSSxDQUFDO1lBQ0osZ0RBQWdEO1lBQ2hELDJDQUEyQztZQUMzQyxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFBZixDQUFlLENBQ2hCO2FBQ0EsSUFBSSxDQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQWpCLENBQWlCLENBQUM7YUFDN0IsSUFBSSxDQUFDLGNBQU0sT0FBQSxVQUFVLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUF2QyxDQUF1QyxDQUFDO2FBQ25ELElBQUksQ0FBQyxjQUFNLE9BQUEsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQTVDLENBQTRDLENBQUM7YUFDeEQsSUFBSSxDQUFDLGNBQU0sT0FBQSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBNUMsQ0FBNEMsQ0FBQyxDQUFDO0tBQzdEO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUI7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCAqIGFzIGNtZCBmcm9tIFwiY29tbWFuZGVyXCI7XG5cbmltcG9ydCB7IENhY2hlLCBGZXRjaE9wdGlvbnMgfSBmcm9tIFwiY2dldFwiO1xuaW1wb3J0ICogYXMgY3htbCBmcm9tIFwiLi4vLi4vcnVudGltZV9wYXJzZXJcIjtcblxuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCIuL3hzZC9Db250ZXh0XCI7XG5pbXBvcnQgeyBOYW1lc3BhY2UgfSBmcm9tIFwiLi94c2QvTmFtZXNwYWNlXCI7XG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tIFwiLi94c2QvTG9hZGVyXCI7XG5pbXBvcnQgeyBleHBvcnROYW1lc3BhY2UgfSBmcm9tIFwiLi94c2QvRXhwb3J0ZXJcIjtcbmltcG9ydCAqIGFzIHNjaGVtYSBmcm9tIFwiLi9zY2hlbWFcIjtcbmltcG9ydCB7IEFkZEltcG9ydHMgfSBmcm9tIFwiLi9zY2hlbWEvdHJhbnNmb3JtL0FkZEltcG9ydHNcIjtcbmltcG9ydCB7IFNhbml0aXplIH0gZnJvbSBcIi4vc2NoZW1hL3RyYW5zZm9ybS9TYW5pdGl6ZVwiO1xuXG50eXBlIF9JQ29tbWFuZCA9IHR5cGVvZiBjbWQ7XG5pbnRlcmZhY2UgSUNvbW1hbmQgZXh0ZW5kcyBfSUNvbW1hbmQge1xuICBhcmd1bWVudHMoc3BlYzogc3RyaW5nKTogSUNvbW1hbmQ7XG59XG5cbihjbWQudmVyc2lvbihcIjAuMC4xXCIpIGFzIElDb21tYW5kKVxuICAuYXJndW1lbnRzKFwiPHVybD5cIilcbiAgLmRlc2NyaXB0aW9uKFwiWFNEIGRvd25sb2FkIGFuZCBjb252ZXJzaW9uIHRvb2xcIilcbiAgLm9wdGlvbihcbiAgICBcIi1ILCAtLWZvcmNlLWhvc3QgPGhvc3Q+XCIsXG4gICAgJ0ZldGNoIGFsbCB4c2QgZmlsZXMgZnJvbSA8aG9zdD5cXG4gICAgKG9yaWdpbmFsIGhvc3QgaXMgcGFzc2VkIGluIEdFVCBwYXJhbWV0ZXIgXCJob3N0XCIpJ1xuICApXG4gIC5vcHRpb24oXG4gICAgXCItUCwgLS1mb3JjZS1wb3J0IDxwb3J0PlwiLFxuICAgIFwiQ29ubmVjdCB0byA8cG9ydD4gd2hlbiB1c2luZyAtLWZvcmNlLWhvc3RcIlxuICApXG4gIC8vIC5vcHRpb24oJy1jLCAtLWNhY2hlLXhzZCA8cGF0aD4nLCAnQ2FjaGUgZG93bmxvYWRlZCBYU0QgZmlsZWQgdW5kZXIgPHBhdGg+JylcbiAgLm9wdGlvbihcIi10LCAtLW91dC10cyA8cGF0aD5cIiwgXCJPdXRwdXQgVHlwZVNjcmlwdCBkZWZpbml0aW9ucyB1bmRlciA8cGF0aD5cIilcbiAgLm9wdGlvbihcIi1qLCAtLW91dC1qcyA8cGF0aD5cIiwgXCJPdXRwdXQgSmF2YVNjcmlwdCBtb2R1bGVzIHVuZGVyIDxwYXRoPlwiKVxuICAuYWN0aW9uKGhhbmRsZUNvbnZlcnQpXG4gIC5wYXJzZShwcm9jZXNzLmFyZ3YpO1xuXG5pZiAocHJvY2Vzcy5hcmd2Lmxlbmd0aCA8IDMpIGNtZC5oZWxwKCk7XG5cbmZ1bmN0aW9uIGhhbmRsZUNvbnZlcnQoZmlsZVBhdGg6IHN0cmluZywgb3B0czogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkge1xuICB2YXIgc2NoZW1hQ29udGV4dCA9IG5ldyBzY2hlbWEuQ29udGV4dCgpO1xuICB2YXIgeHNkQ29udGV4dCA9IG5ldyBDb250ZXh0KHNjaGVtYUNvbnRleHQpO1xuXG4gIHZhciBmZXRjaE9wdGlvbnM6IEZldGNoT3B0aW9ucyA9IHt9O1xuXG4gIGlmIChvcHRzW1wiZm9yY2VIb3N0XCJdKSB7XG4gICAgZmV0Y2hPcHRpb25zLmZvcmNlSG9zdCA9IG9wdHNbXCJmb3JjZUhvc3RcIl07XG4gICAgaWYgKG9wdHNbXCJmb3JjZVBvcnRcIl0pIGZldGNoT3B0aW9ucy5mb3JjZVBvcnQgPSBvcHRzW1wiZm9yY2VQb3J0XCJdO1xuXG4gICAgQ2FjaGUucGF0Y2hSZXF1ZXN0KCk7XG4gIH1cblxuICB2YXIganNDYWNoZSA9IG5ldyBDYWNoZShvcHRzW1wib3V0SnNcIl0gfHwgXCJ4bWxuc1wiLCBcIl9pbmRleC5qc1wiKTtcbiAgdmFyIHRzQ2FjaGUgPSBuZXcgQ2FjaGUob3B0c1tcIm91dFRzXCJdIHx8IFwieG1sbnNcIiwgXCJfaW5kZXguZC50c1wiKTtcblxuICB2YXIgbG9hZGVyID0gbmV3IExvYWRlcih4c2RDb250ZXh0LCBmZXRjaE9wdGlvbnMpO1xuXG4gIGNvbnN0IG5hbWVzcGFjZSA9IGxvYWRlci5pbXBvcnQoZmlsZVBhdGgpO1xuICB0cnkge1xuICAgIGV4cG9ydE5hbWVzcGFjZSh4c2RDb250ZXh0LnByaW1pdGl2ZVNwYWNlLCBzY2hlbWFDb250ZXh0KTtcbiAgICBleHBvcnROYW1lc3BhY2UoeHNkQ29udGV4dC54bWxTcGFjZSwgc2NoZW1hQ29udGV4dCk7XG5cbiAgICB2YXIgc3BlYyA9IGV4cG9ydE5hbWVzcGFjZShuYW1lc3BhY2UsIHNjaGVtYUNvbnRleHQpO1xuXG4gICAgdmFyIGFkZEltcG9ydHMgPSBuZXcgQWRkSW1wb3J0cyhzcGVjKTtcbiAgICB2YXIgc2FuaXRpemUgPSBuZXcgU2FuaXRpemUoc3BlYyk7XG5cbiAgICB2YXIgaW1wb3J0c0FkZGVkID0gYWRkSW1wb3J0cy5leGVjKCk7XG5cbiAgICAvLyBGaW5kIElEIG51bWJlcnMgb2YgYWxsIHR5cGVzIGltcG9ydGVkIGZyb20gb3RoZXIgbmFtZXNwYWNlcy5cbiAgICBpbXBvcnRzQWRkZWRcbiAgICAgIC50aGVuKCgpID0+XG4gICAgICAgIC8vIFJlbmFtZSB0eXBlcyB0byB2YWxpZCBKYXZhU2NyaXB0IGNsYXNzIG5hbWVzLFxuICAgICAgICAvLyBhZGRpbmcgYSBwcmVmaXggb3Igc3VmZml4IHRvIGR1cGxpY2F0ZXMuXG4gICAgICAgIHNhbml0aXplLmV4ZWMoKVxuICAgICAgKVxuICAgICAgLnRoZW4oKCkgPT4gc2FuaXRpemUuZmluaXNoKCkpXG4gICAgICAudGhlbigoKSA9PiBhZGRJbXBvcnRzLmZpbmlzaChpbXBvcnRzQWRkZWQudmFsdWUoKSkpXG4gICAgICAudGhlbigoKSA9PiBuZXcgc2NoZW1hLmV4cG9ydGVyLkpTKHNwZWMsIGpzQ2FjaGUpLmV4ZWMoKSlcbiAgICAgIC50aGVuKCgpID0+IG5ldyBzY2hlbWEuZXhwb3J0ZXIuVFMoc3BlYywgdHNDYWNoZSkuZXhlYygpKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIGNvbnNvbGUubG9nKFwiU3RhY2s6XCIpO1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKTtcbiAgfVxufVxuIl19