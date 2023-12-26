var BABYLONX;
(function (BABYLONX) {
    var GeometryBuilder = (function () {
        function GeometryBuilder() {
        }
        GeometryBuilder.GetTotalLength = function (path) {
            return null;
        };
        GeometryBuilder.Dim = function (v, u) {
            return Math.sqrt(Math.pow(u.x - v.x, 2.) + Math.pow(u.y - v.y, 2.) + (GeometryBuilder.Def(u.z, GeometryBuilder._null) ? Math.pow(u.z - v.z, 2.) : 0));
        };
        GeometryBuilder.Def = function (a, d) {
            if (a != undefined && a != null)
                return (d != undefined && d != null ? a : true);
            else if (d != GeometryBuilder._null)
                return (d != undefined && d != null ? d : false);
            return null;
        };
        GeometryBuilder.Replace = function (s, t, d) {
            var ignore = null;
            return s.replace(new RegExp(t.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (d) == "string") ? d.replace(/\$/g, "$$$$") : d);
        };
        GeometryBuilder.AddUv = function (faceUV, geo, index, uvs, uve) {
            if (!faceUV || faceUV.length == 0 || faceUV.length < index) {
                geo.uvs.push(uvs.u, uvs.v);
                return;
            }
            if (faceUV[index].toString() == "0")
                geo.uvs.push(uvs.u, uvs.v);
            if (faceUV[index].toString() == "1")
                geo.uvs.push(uvs.u, uve.v);
            if (faceUV[index].toString() == "2")
                geo.uvs.push(uve.u, uvs.v);
            if (faceUV[index].toString() == "3")
                geo.uvs.push(uve.u, uve.v);
        };
        ;
        GeometryBuilder.Exchange = function (p) {
            if (!GeometryBuilder.Def(p, GeometryBuilder._null))
                return false;
            return (p.x || p.x == 0.0);
        };
        GeometryBuilder.PushVertex = function (geo, p1, uv) {
            if (uv)
                uv = { u: 0., v: 0. };
            geo.vertices.push({ x: p1.x, y: p1.y, z: p1.z });
            geo.positions.push(p1.x, p1.y, p1.z);
            if (uv)
                geo.uvs.push(uv.u, uv.v);
            return geo.vertices.length - 1;
        };
        GeometryBuilder.MakeFace = function (geo, _points, option) {
            if (!option)
                option = {
                    faceUVMap: "",
                    pointIndex1: null,
                    pointIndex2: null,
                    pointIndex3: null,
                    pointIndex4: null,
                    uvStart: null,
                    uvEnd: null,
                    Face3Point: false,
                    flip: false,
                    onlyPush: false
                };
            var points = { point1: _points[0], point2: _points[1], point3: _points[2], point4: _points[3] };
            if (!option.uvStart)
                option.uvStart = { u: 0., v: 0. };
            if (!option.uvEnd)
                option.uvEnd = { u: 1., v: 1. };
            if (option.onlyPush || GeometryBuilder.Exchange(points.point1)) {
                geo.vertices.push({ x: points.point1.x, y: points.point1.y, z: points.point1.z });
                geo.positions.push(points.point1.x, points.point1.y, points.point1.z);
                GeometryBuilder.AddUv(option.faceUVMap, geo, 0, option.uvStart, option.uvEnd);
                option.pointIndex1 = geo.vertices.length - 1;
            }
            if (option.onlyPush || GeometryBuilder.Exchange(points.point2)) {
                geo.vertices.push({ x: points.point2.x, y: points.point2.y, z: points.point2.z });
                geo.positions.push(points.point2.x, points.point2.y, points.point2.z);
                GeometryBuilder.AddUv(option.faceUVMap, geo, 1, option.uvStart, option.uvEnd);
                option.pointIndex2 = geo.vertices.length - 1;
            }
            if (option.onlyPush || GeometryBuilder.Exchange(points.point3)) {
                geo.vertices.push({ x: points.point3.x, y: points.point3.y, z: points.point3.z });
                geo.positions.push(points.point3.x, points.point3.y, points.point3.z);
                GeometryBuilder.AddUv(option.faceUVMap, geo, 2, option.uvStart, option.uvEnd);
                option.pointIndex3 = geo.vertices.length - 1;
            }
            if (!option.Face3Point) {
                if (option.onlyPush || GeometryBuilder.Exchange(points.point4)) {
                    geo.vertices.push({ x: points.point4.x, y: points.point4.y, z: points.point4.z });
                    geo.positions.push(points.point4.x, points.point4.y, points.point4.z);
                    GeometryBuilder.AddUv(option.faceUVMap, geo, 3, option.uvStart, option.uvEnd);
                    option.pointIndex4 = geo.vertices.length - 1;
                }
            }
            if (!option.onlyPush) {
                if (option.pointIndex1 == null || option.pointIndex1 == undefined)
                    option.pointIndex1 = points.point1;
                if (option.pointIndex2 == null || option.pointIndex2 == undefined)
                    option.pointIndex2 = points.point2;
                if (option.pointIndex3 == null || option.pointIndex3 == undefined)
                    option.pointIndex3 = points.point3;
                if (!option.Face3Point) {
                    if (option.pointIndex4 == null || option.pointIndex4 == undefined)
                        option.pointIndex4 = points.point4;
                }
                if (!GeometryBuilder.Def(GeometryBuilder.isInOption, GeometryBuilder._null)) {
                    if (option.flip) {
                        geo.faces.push(option.pointIndex1, option.pointIndex2, option.pointIndex3);
                        if (!option.Face3Point)
                            geo.faces.push(option.pointIndex2, option.pointIndex4, option.pointIndex3);
                    }
                    else {
                        geo.faces.push(option.pointIndex1, option.pointIndex3, option.pointIndex2);
                        if (!option.Face3Point)
                            geo.faces.push(option.pointIndex2, option.pointIndex3, option.pointIndex4);
                    }
                }
                else {
                    if (option.flip) {
                        if (GeometryBuilder.isInOption.a && GeometryBuilder.isInOption.b && GeometryBuilder.isInOption.c)
                            geo.faces.push(option.pointIndex1, option.pointIndex2, option.pointIndex3);
                        if (GeometryBuilder.isInOption.b && GeometryBuilder.isInOption.d && GeometryBuilder.isInOption.c && !option.Face3Point)
                            geo.faces.push(option.pointIndex2, option.pointIndex4, option.pointIndex3);
                    }
                    else {
                        if (GeometryBuilder.isInOption.a && GeometryBuilder.isInOption.c && GeometryBuilder.isInOption.b)
                            geo.faces.push(option.pointIndex1, option.pointIndex3, option.pointIndex2);
                        if (GeometryBuilder.isInOption.b && GeometryBuilder.isInOption.c && GeometryBuilder.isInOption.d && !option.Face3Point)
                            geo.faces.push(option.pointIndex2, option.pointIndex3, option.pointIndex4);
                    }
                }
            }
            if (!option.onlyPush)
                GeometryBuilder.isInOption = null;
            return [option.pointIndex1, option.pointIndex2, option.pointIndex3, option.pointIndex4];
        };
        GeometryBuilder.ImportGeometry = function (geo, v, f, ts) {
            var st = geo.vertices.length;
            for (var i = 0; i < v.length; i++) {
                geo.vertices.push({ x: v[i].x + (ts.x), y: v[i].y + (ts.y), z: v[i].z + (ts.z) });
                geo.positions.push(v[i].x + (ts.x), v[i].y + (ts.y), v[i].z + (ts.z));
            }
            for (var i = 0; i < f.length; i++) {
                if (!ts || !ts.checkFace || ts.face(i, f[i]))
                    geo.faces.push(f[i].a + st, f[i].b + st, f[i].c + st);
            }
        };
        GeometryBuilder.GeometryBase = function (firstp, builder, exGeo, custom) {
            var geo = {
                faces: [],
                vertices: [],
                normals: [],
                positions: [],
                uvs: [],
                uvs2: [],
                name: ""
            };
            if (!exGeo)
                exGeo = geo;
            if (builder) {
                builder(firstp, exGeo);
            }
            if (custom) {
                exGeo = custom(exGeo);
            }
            return exGeo;
        };
        GeometryBuilder.GetGeometryFromBabylon = function (geo, to) {
            to.faces = geo.indices;
            to.positions = geo.positions;
            to.normals = geo.normals;
            to.uvs = geo.uvs;
            return to;
        };
        GeometryBuilder.GetPoints = function (op) {
            var h1 = 1;
            function getLenRounded(pat, i) {
                var i = pat.getPointAtLength(i);
                return i; //{ x: round(i.x * ik) / ik, y: round(i.y * ik) / ik };
            }
            op.step = GeometryBuilder.Def(op.step, 0.5);
            var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", op.path);
            var result = [];
            var len = GeometryBuilder.GetTotalLength(path); //path.getTotalLength();
            if (GeometryBuilder.Def(op.inLine, GeometryBuilder._null) && (!GeometryBuilder.Def(op.pointLength, GeometryBuilder._null) || op.pointLength < 1000)) {
                op.step = 0.3;
            }
            if (GeometryBuilder.Def(op.pointLength, GeometryBuilder._null)) {
                op.min = len / op.pointLength;
            }
            var plen = 0.0;
            var s = getLenRounded(path, 0);
            op.density = GeometryBuilder.Def(op.density, [1]);
            function getDensityMapStep(index) {
                var ps = Math.floor(op.density.length * (index / len));
                return op.step / op.density[ps];
            }
            var p = s;
            var c = getLenRounded(path, op.step);
            plen += op.step;
            op.push(result, s);
            var p_o = 0;
            var oo_p = { x: 0, y: 0 };
            for (var i = op.step * 2; i < len; i += getDensityMapStep(i)) {
                h1++;
                var n = getLenRounded(path, i);
                plen += op.step;
                if (GeometryBuilder.Def(op.inLine, true)) {
                    if (i == op.step * 2)
                        op.push(result, c);
                    if (plen > GeometryBuilder.Def(op.min, 10.)) {
                        op.push(result, n);
                        plen = 0.0;
                    }
                }
                else {
                    var d1 = GeometryBuilder.Dim(p, c);
                    var d2 = GeometryBuilder.Dim(c, n);
                    var d3 = GeometryBuilder.Dim(p, n);
                    var d4 = 0;
                    var d5 = 0;
                    if (GeometryBuilder.Def(p_o, GeometryBuilder._null)) {
                        d4 = GeometryBuilder.Dim(p_o, c);
                        d5 = GeometryBuilder.Dim(p_o, n);
                    }
                    var iilen = Math.abs(d3 - (d2 + d1));
                    var lll = GeometryBuilder.SvgCalibration;
                    if (iilen > lll || p_o > lll) {
                        if (GeometryBuilder.Dim(n, oo_p) > 4.0) {
                            op.push(result, n);
                            oo_p = n;
                        }
                        plen = 0.0;
                        p_o = 0;
                    }
                    else {
                        p_o += iilen;
                    }
                }
                p = c;
                c = n;
            }
            result = op.push(result, getLenRounded(path, len), true);
            var sr = [];
            var i = 0;
            for (i = GeometryBuilder.Def(op.start, 0); i < result.length - GeometryBuilder.Def(op.end, 0); i++) {
                sr.push(result[i]);
            }
            return sr;
        };
        GeometryBuilder.BuildBabylonMesh = function (scene, geo) {
            return null;
        };
        GeometryBuilder.ToBabylonGeometry = function (geo) {
            return null;
        };
        GeometryBuilder.InitializeEngine = function () {
            eval("BABYLONX.GeometryBuilder.ToBabylonGeometry = function(op) {    var vertexData = new BABYLON.VertexData();  vertexData.indices = op.faces;    vertexData.positions = op.positions;    vertexData.normals = op.normals; vertexData.uvs = op.uvs;    if (BABYLONX.GeometryBuilder.Def(op.uv2s , GeometryBuilder._null))        vertexData.uv2s = op.uv2s;    else        vertexData.uv2s = [];    return vertexData; } ");
            eval('BABYLONX.GeometryBuilder.GetTotalLength = function(path){return path.getTotalLength();}');
            eval("BABYLONX.GeometryBuilder.BuildBabylonMesh = function(opscene,opgeo){        var geo = BABYLONX.GeometryBuilder.ToBabylonGeometry(opgeo);    var mesh = new BABYLON.Mesh(  opgeo.name, opscene);    geo.normals = BABYLONX.GeometryBuilder.Def(geo.normals, []);    try {  BABYLON.VertexData.ComputeNormals(geo.positions, geo.indices, geo.normals);    } catch (e) {    }    geo.applyToMesh(mesh, false);  var center = { x: 0, y: 0, z: 0 };  for (i = 0; i < geo.positions.length; i += 3.0) {  center.x += geo.positions[i];  center.y += geo.positions[i + 1];  center.z += geo.positions[i + 2];  }  center = { x: center.x * 3.0 / geo.positions.length, y: center.y * 3.0 / geo.positions.length, z: center.z * 3.0 / geo.positions.length };    mesh.center = center;    return mesh; }");
        };
        GeometryBuilder.isInOption = null;
        GeometryBuilder.face3UV012 = "012";
        GeometryBuilder.face3UV021 = "021";
        GeometryBuilder.face3UV201 = "201";
        GeometryBuilder.face3UV210 = "210";
        GeometryBuilder.face4UV0123 = "0123";
        GeometryBuilder.face4UV0132 = "0132";
        GeometryBuilder.face4UV1023 = "1023";
        GeometryBuilder.face4UV1032 = "1032";
        GeometryBuilder._null = 'set null anyway';
        GeometryBuilder.SvgCalibration = 0.00001;
        return GeometryBuilder;
    })();
    BABYLONX.GeometryBuilder = GeometryBuilder;
    var Geometry = (function () {
        function Geometry(geo) {

            ind = 0;
            this.faces = GeometryBuilder.Def(geo.faces, []);
            this.positions = GeometryBuilder.Def(geo.positions, []);
            this.normals = GeometryBuilder.Def(geo.normals, []);
            this.uvs = GeometryBuilder.Def(geo.uvs, []);
            this.uvs2 = GeometryBuilder.Def(geo.uvs2, []);
            this.name = geo.name;
        }
        Geometry.prototype.toMesh = function (scene) {
            var mesh = GeometryBuilder.BuildBabylonMesh(scene, this);
            return mesh;
        };
        return Geometry;
    })();
    BABYLONX.Geometry = Geometry;
})(BABYLONX || (BABYLONX = {}));

var mix = function (a, b, n) {

    if (n)
        for (var bi in b)
            a[bi] = def(b[bi], def(a[bi], ''));

    else
        for (var bi in b)
            if (a[bi] != null && a[bi] != undefined) a[bi] = def(b[bi], def(a[bi], ''));

    return a;
};


BABYLONX.GeometryBuilder.Part = function (setting, external) {
    this.Setting = def(setting, {});
    this.ExternalPush = external;
};



BABYLONX.GeometryBuilder.Part.prototype = {
    Creator: function (setting) { },

    Create: function (fn) { this.Creator = fn; return this; },

    New: function (setting, custom, param) {
        var th = this;
        if (custom)
            this.Creator(mix(setting, th.Setting),
                function (p) { return custom(th.PushVertex(p, mix(setting, th.Setting)), mix(setting, th.Setting), param); });
        else
            this.Creator(mix(setting, this.Setting), this.PushVertex); return this;
    },

    PushVertex: function (p) { return p; },


    ExternalPush: function (p) { return p; },
    Custom: function (fn) { this.PushVertex = fn; return this; },
    Setting: {}
};





BABYLONX.GeometryBuilder.Rims = function () {

    this.edgs = new Array();
    this.edgsNames = new Array();
    this.Rims_Points = new Array();
    this.Rim_Index = 0;
    return this;
};


BABYLONX.GeometryBuilder.h_p = function (geo, lpt, r) {
    if (!geo.helpers) geo.helpers = [];

    geo.helpers.push({ t: 'point', pt: lpt, r: r });
};


BABYLONX.GeometryBuilder.showHelpers = function (geo) {

    for (var i in geo.helpers) {

        i = geo.helpers[i];
        if (i.t == 'point') {
            var lpt = i.pt;
            var r = i.r * 10.;
            GB.MakeFace(geo, [{ x: lpt.x - 1.1 * r, y: lpt.y, z: lpt.z - 0.1 * r }, { x: lpt.x + 1.1 * r, y: lpt.y, z: lpt.z - 0.1 * r }, { x: lpt.x - 1.1 * r, y: lpt.y, z: lpt.z + 0.1 * r }, { x: lpt.x + 1.1 * r, y: lpt.y, z: lpt.z + 0.1 * r }], {
                flip: true,
                faceUVMap: "0123"
            });
            GB.MakeFace(geo, [{ x: lpt.x - .1 * r, y: lpt.y - 1.1 * r, z: lpt.z }, { x: lpt.x + .1 * r, y: lpt.y - 1.1 * r, z: lpt.z }, { x: lpt.x - 0.1 * r, y: lpt.y + 1.1 * r, z: lpt.z }, { x: lpt.x + 0.1 * r, y: lpt.y + 1.1 * r, z: lpt.z }], {
                flip: true,
                faceUVMap: "0123"
            });

            GB.MakeFace(geo, [{ x: lpt.x, y: lpt.y - 0.1 * r, z: lpt.z - 1.1 * r }, { x: lpt.x, y: lpt.y - 0.1 * r, z: lpt.z + 1.1 * r }, { x: lpt.x, y: lpt.y + 0.1 * r, z: lpt.z - 1.1 * r }, { x: lpt.x, y: lpt.y + 0.1 * r, z: lpt.z + 1.1 * r }], {
                flip: true,
                faceUVMap: "0123"
            });

        }

    }

};


var process = function (pts1, pts2) {
    var n = pts1.length; var m = pts2.length; var r = max(n, m);
    var fy = function (i, n) { var f = function (ix) { return ceil((ix + 1) * (n / r)) - 1; }; var f2 = function (ix) { return ceil(ix * (n / r)); }; var fn = f(n); if (fn <= n) return f2(i); else f(i); };
    var p = { p1: [], p2: [] };
    for (var i = 1; i <= r; i++) { p.p1.push(fy(i, n) - 1); p.p2.push(fy(i, m) - 1); }
    return p;
};


BABYLONX.GeometryBuilder.EdgeRef = function (ref) {

    var res = { r: ref, step: [] };
    for (var i = 0; i < ref.i.length; i++) {
        res.step.push(i);
    }
    return res;

}
BABYLONX.GeometryBuilder.Edge = function (geo, l, p, path, repeat) {

    var path_pts = null;
    if (path && !path.points) {
        if (!GB.cachePath) GB.cachePath = [];
        if (path.d.indexOf('|') != -1) {
            var key = path.d.split('|')[0];
            path.d = path.d.split('|')[1];
            GB.cachePath[key] = path.d;
        }
        if (path.d.indexOf('=') == 0) {
            path.d = GB.cachePath[path.d.replace('=', '')];
        }

        path.d = def(path.d, "m 547.25,526.17859 c 0,0 -0.75,-28.06641 -21.25,-28.31641 -20.5,-0.25 -20.25,16.5 -20.25,16.5");
        path.d2 = def(path.d2, "empty");
        path.l = def(path.l, 0);
        path.s = def(path.s, 100);

        var key = JSON.stringify(path);

        if (!GB.cache) GB.cache = [];

        if (GB.cache[key]) path_pts = GB.cache[key];

        else {

            path_pts = GB.GetPoints({
                path: path.d, density: path.dn,
                push: def(path.p, function (r, n, e) {

                    r.push({ x: (-n.x + 526) / path.s, y: 0.0, z: (n.y - 526) / path.s });
                    if (e) { return r; }

                }), pointLength: path.c, inLine: path.l
            });


            if (path.d2 != "empty") {

                var pathd2 = GB.GetPoints({
                    path: path.d2,
                    push: def(path.p, function (r, n, e) {
                        if (e) { return r; }
                        r.push({ x: (-n.x + 526) / path.s, y: 0.0, z: (n.y - 526) / path.s });
                    }), pointLength: path.c, inLine: path.l
                });


                for (var i_ppt in path_pts) {

                    var endijloop = false;
                    for (var ij = 0; !endijloop && ij < pathd2.length - 1; ij++) {
                        if (pathd2[ij].x < path_pts[i_ppt].x && pathd2[0].x > path_pts[i_ppt].x) {
                            endijloop = true;
                            path_pts[i_ppt].y = (pathd2[ij + 1].z - pathd2[ij].z) *
                                ((pathd2[ij + 1].x - pathd2[ij].x) / (path_pts[i_ppt].x - pathd2[ij].z)) + pathd2[ij].z - path_pts[i_ppt].z;
                        }
                    }

                }


            }


            GB.cache[key] = path_pts;

        }

        s = path_pts.length;

    }
    else if (path && path.points) {
        path_pts = path.points;
    }
    var sylc = { i: [], f: [], isCylc: true, std: ind };
    var std = ind;

    var al = (2. * Math.PI) / (s - 1);
    var s = path_pts.length;
    for (var i = 0; i < s; i++) {
        var al1 = i * al;
        var pot = { x: 10. * sin(al1), y: 0., z: 10. * cos(al1) };

        if (path && path_pts && path_pts[i])
            pot = { x: path_pts[i].x, y: path_pts[i].y, z: path_pts[i].z };

        var pot1 = r_y(pot, def(p.ry, 0.) * Math.PI / 180., def(p.ce, { x: 0, y: 0, z: 0 }));
        var pot2 = r_x(pot1, def(p.rx, 0.) * Math.PI / 180., def(p.ce, { x: 0, y: 0, z: 0 }));
        var pot3 = r_z(pot2, def(p.rz, 0.) * Math.PI / 180., def(p.ce, { x: 0, y: 0, z: 0 }));

        pot3.y *= def(p.sy, 1.);
        pot3.z *= def(p.sz, 1.);
        pot3.x *= def(p.sx, 1.);
        pot3.y *= def(p.sa, 1.);
        pot3.z *= def(p.sa, 1.);
        pot3.x *= def(p.sa, 1.);

        if (p && p.y && typeof p.y == "function") pot3.y += def(p.y(pot3), 0.); else pot3.y += def(p.y, 0.);
        if (p && p.x && typeof p.x == "function") pot3.x += def(p.x(pot3), 0.); else pot3.x += def(p.x, 0.);
        if (p && p.z && typeof p.z == "function") pot3.z += def(p.z(pot3), 0.); else pot3.z += def(p.z, 0.);



        pot3 = r_y(pot, def(p.mry, 0.) * Math.PI / 180., def(p.mce, { x: 0, y: 0, z: 0 }));
        pot3 = r_x(pot1, def(p.mrx, 0.) * Math.PI / 180., def(p.mce, { x: 0, y: 0, z: 0 }));
        pot3 = r_z(pot2, def(p.mrz, 0.) * Math.PI / 180., def(p.mce, { x: 0, y: 0, z: 0 }));

        var u = path.uvv ? path.uvv(i, s, pot3) : i / s;
        if (u.x)
            geo.uvs.push(u.x, u.y);
        else geo.uvs.push(u, l);

        if (p.custom) pot3 = p.custom(pot3, i, s);

        pot3.x = -1. * pot3.x;

        GB.PushVertex(geo, pot3);
        sylc.i[i] = ind;
        ind++;


    }

    if (p.reverse) sylc.i = sylc.i.reverse();



    if (repeat && repeat > 1) {
        var rep = [BABYLONX.GeometryBuilder.EdgeRef(sylc)];
        for (var i = 1; i < repeat; i++) {
            rep.push(BABYLONX.GeometryBuilder.Edge(geo, l, p, path)[0]);
        }

        return rep;
    }

    return [BABYLONX.GeometryBuilder.EdgeRef(sylc)];

};






BABYLONX.GeometryBuilder.Connect = function (geo, s, r, f, m) {

    r = r.r;

    if (r.length == 1) {

        r = r[0];
        if (r.step) {
            var i = { i: [], f: [], isCylc: true, std: r.std };
            for (var j in r.step) { i.i.push(r.r.i[r.step[j]]); }
            r = i;
        }

    }

    var sylc = { i: [], f: [], isCylc: true, std: ind };
    var std = ind;


    for (var j in s.step) { sylc.i.push(s.r.i[s.step[j]]); }
    sylc.std = s.r.std;


    if (r.isCylc) {
        var p1 = [];
        for (var i = 0; i < sylc.i.length; i++) {
            p1.push(sylc.i[i]);
        }
        var hlp = process(p1, r.i);

        for (var i = 0; i < hlp.p1.length - 1; i++) {

            var defm = def(m, function (ar, ff) {
                GB.MakeFace(geo, ar, { flip: ff, faceUVMap: "0123" });
            });
            defm([p1[hlp.p1[i]], r.i[hlp.p2[i]], p1[hlp.p1[i + 1]], r.i[hlp.p2[i + 1]]], f);
            sylc.f[geo.faces.length];
        }

    }

};

var ind = 0;

BABYLONX.GeometryBuilder.PointsPart = function () {
    this.parts = [];
};
BABYLONX.GeometryBuilder.PointsPart.prototype = {
    count: 0,
    add: function (c, f) {
        this.parts.push({ oc: this.count * 1., c: c, f: f });
        this.count += c;
        return this;
    },
    parts: null,
    toRim: function (f, op) {
        var th = this;

        return {
            count: this.count,
            point: function (p, i) {

                for (var j = 0; j < th.parts.length; j++) {
                    if (i >= th.parts[j].oc && i < th.parts[j].oc + th.parts[j].c) {

                        p = cln(
                            th.parts[j].f(p,
                                i - th.parts[j].oc,
                                th.parts[j].c, op,
                                (j > 0 ? th.parts[j - 1].lp : { x: 0, y: 0, z: 0 })),
                            (j > 0 ? th.parts[j - 1].lp : null));
                        if (i == th.parts[j].oc + th.parts[j].c - 1) th.parts[j].lp = cln(p);

                    }
                }
                return f(p, op);
            }
        };
    }
};

var GB = BABYLONX.GeometryBuilder;



function r_lasp(p, tar) {
    if (tar.x == 0) tar.x += 0.00001;
    if (tar.y == 0) tar.y += 0.00001;
    if (tar.z == 0) tar.z += 0.00001;


    var t1 = { x: tar.x, y: tar.y, z: tar.z };
    var t2 = { x: tar.x, y: tar.y, z: tar.z };

    t1 = (t1);

    var a = atan(t1.x / t1.z);

    t2 = (r_y(t2, a));
    var b = atan(t2.z / t2.y);

    p = r_x(p, 90 * deg);
    var ang1 = 0, ang2 = 0, ang3 = 0;

    ang1 = -1 * (90 * deg - b);
    ang2 = -a;





    p = r_x(p, ang1);
    p = r_y(p, ang2);
    p = r_z(p, ang3 * 180. * deg);




    return p;
}

var curr_uv_map = { us: 0, vs: 0, scale: 1.0 };

function uvMap(us, vs, scale) {
    curr_uv_map = { us: us, vs: vs, scale: scale };
}

function setUvMap(s) {

    return { u: curr_uv_map.us + curr_uv_map.scale * s.u, v: curr_uv_map.vs + curr_uv_map.scale * s.v };

}

BABYLONX.GeometryBuilder.Rims.prototype = {
    edgs: null,
    edgsNames: null,
    Rim_Index: 0,
    uvMap: { us: 0, vs: 0, scale: 1.0 },
    Rims_Points: null,
    Rim_Custom: function (p) { return p; },
    Custom: function (fun) { var th = this; this.Rim_Custom = fun; return th; },
    Rim_UV: function (p, i, s, u, v) {

        return { u: def(u, 0) + 0.01, v: def(v, 0) + 0.01 };
    }
    , UV: function (fun) {

        var th = this; this.Rim_UV = fun; return th;
    }
    , UVMap: function (us, vs, scale) {

        var th = this; th.uvMap = { us: us, vs: vs, scale: scale }; return th;
    },
    RimPart: function (geo, count, point, uv, repeat) {
        var th = this;

        if (!point && count.count) {

            point = count.point;
            uv = count.uv;
            repeat = count.repeat;
            notEnd = true;
            count = count.count;
            th.PushRim(geo, count);
        }
        else {
            th.PushRim(geo, count, point, uv, repeat, true);
        }
        return th;

    },
    EndRimParts: function (geo) {
        var th = this;
        th.PushRim(geo, 0, function (p) { return p; });

        return th;

    },
    PushRim: function (geo, count, point, uv, repeat, notEnd) {
        var name = null;
        if (!point && count.count) {
            name = count.name;
            point = count.point;
            uv = count.uv;
            repeat = count.repeat;
            notEnd = count.notEnd;
            count = count.count;
        }

        var th = this;
        if (typeof (uv) == 'function')
            th = th.UV(uv);

        var MirPt = function (p) { if (GB && GB.rightHand && p && p.x) p.x *= -1.; return p; };


        repeat = def(repeat, 1);

        if (!th.Rims_Points[th.Rim_Index]) th.Rims_Points[th.Rim_Index] = [];
        if (count.length) th.Rims_Points[th.Rim_Index] = count;
        else if (count > 0) {
            for (var i = 0; i < count; i++) {
                th.Rims_Points[th.Rim_Index].push(th.Rim_Custom(MirPt(point({ x: 0, y: 0, z: 0 }, i, th.Rim_Index, i / count))));
            }
        }
        if (!notEnd) {
            th.edgs[th.Rim_Index] = GB.Edge(geo, typeof (uv) == 'function' ? 0.0 : uv, {
                custom: function (p, i, s) {
                    var uv = th.Rim_UV(p, i, s - 1, geo.uvs[geo.uvs.length - 3], geo.uvs[geo.uvs.length - 4]);
                    geo.uvs[geo.uvs.length - 1] = curr_uv_map.us + curr_uv_map.scale * (th.uvMap.us + th.uvMap.scale * uv.u); geo.uvs[geo.uvs.length - 2] = curr_uv_map.vs + curr_uv_map.scale * (th.uvMap.vs + th.uvMap.scale * uv.v);
                    return p;
                }
            }, { points: th.Rims_Points[th.Rim_Index] }, repeat);
            th.Rim_Index++;
        }

        if (name) {

            th.edgsNames[th.Rim_Index - 1] = name;
        }


        return th;
    },
    Connect: function (geo, a, b, f, c, d) {

        if (GB && GB.rightHand)
            f = !f;

        var th = this;
        try {
            if (AF != null) {

                AFConnect++;

                if (AFSingle && AFConnect != AF) return th;
                else if (AFConnect - 1 > AF) return th;

            }
        } catch (e) { }


        if (typeof (a) == 'string') {
            var am = a;
            for (var ls in th.edgs) {
                if (th.edgsNames[ls] == am)
                    a = ls.valueOf() * 1;
            }
        }

        if (typeof (b) == 'string') {
            var bm = b;
            for (var ls in th.edgs) {
                if (th.edgsNames[ls] == bm)
                    b = ls.valueOf() * 1;
            }
        }

        try {
            if (th.Rim_Index > 1 || th.edgs[0].length > 0) {
                a = def(a, th.Rim_Index - 1);
                b = def(b, th.Rim_Index - 2);
                c = def(c, 0);
                d = def(d, (a == b) ? 1 : 0);
                GB.Connect(geo, a == -1 ? th.edgs[th.Rim_Index - 1][c] : th.edgs[a][c], b == -1 ? th.edgs[th.Rim_Index - 1][d] : th.edgs[b][d], f);
            }
        } catch (e) { }
        return th;
    },

    FlatUV: function (md, x, y, sc, scx, scy) {
        var th = this;
        th.uvStartX = x;
        th.uvStartY = y;
        th.uvScale = def(sc, def(th.uvScale, 1.));



        th.UV(function (p, i, s, n) {
            var de = {};

            if (md[0] == 'x') de.u = p.x * th.uvScale * def(scx, 1.) + y;
            if (md[0] == 'y') de.u = p.y * th.uvScale * def(scx, 1.) + y;
            if (md[0] == 'z') de.u = p.z * th.uvScale * def(scx, 1.) + y;

            if (md[1] == 'x') de.v = p.x * th.uvScale * def(scy, 1.) + x;
            if (md[1] == 'y') de.v = p.y * th.uvScale * def(scy, 1.) + x;
            if (md[1] == 'z') de.v = p.z * th.uvScale * def(scy, 1.) + x;
            return de;
        });

        return th;
    }, ScaleUV: function (sc) {
        var th = this;
        th.uvScale = def(sc, def(th.uvScale, 1.));
        return th;
    }, PushSquare: function (geo, op, cus) {
        var th = this;
        cus = def(cus, function (p, op) { return p_ts(p, def(op.ts, {})); });
        op.w = def(op.w, 1.);
        op.d = def(op.d, 1.);
        op.x = def(op.x, 0.);
        op.y = def(op.y, 0.);
        op.z = def(op.z, 0.);
        op.sf = def(op.sf, 'xy');

        th.PushRim(geo, {
            name: op.name,
            count: 4 * def(op.solid, 1.) + 1,
            repeat: op.rep,
            point: function (p, i2) {
                var i = floor(i2 / def(op.solid, 1.));
                if (op.sf[0] == 'x') p.x = (i == 0 || i == 1 || i == 4 ? -1 : 1.) * op.w * 0.5 + op.x;
                if (op.sf[0] == 'y') p.y = (i == 0 || i == 1 || i == 4 ? -1 : 1.) * op.w * 0.5 + op.y;
                if (op.sf[0] == 'z') p.z = (i == 0 || i == 1 || i == 4 ? -1 : 1.) * op.w * 0.5 + op.z;

                if (op.sf[1] == 'x') p.x = (i == 0 || i == 3 || i == 4 ? -1 : 1.) * op.d * 0.5 + op.x;
                if (op.sf[1] == 'y') p.y = (i == 0 || i == 3 || i == 4 ? -1 : 1.) * op.d * 0.5 + op.y;
                if (op.sf[1] == 'z') p.z = (i == 0 || i == 3 || i == 4 ? -1 : 1.) * op.d * 0.5 + op.z;

                if (op.sf.indexOf('x') == -1) p.x = op.x; if (op.sf.indexOf('y') == -1) p.y = op.y; if (op.sf.indexOf('z') == -1) p.z = op.z;

                return def(op.cus, cus)(p, op);
            }
        }); return th;
    }, PushCircle: function (geo, op, cus) {
        var th = this;
        cus = def(cus, function (p, op, i) { return p_ts(p, def(op.ts, {})); });
        op.w = def(op.w, 1.);
        op.d = def(op.d, 1.);
        op.x = def(op.x, 0.);
        op.y = def(op.y, 0.);
        op.z = def(op.z, 0.);
        op.sf = def(op.sf, 'xy');

        var rot_mig = def(op.rot, 50.) * deg;

        var seg = def(op.s, 32) * def(op.solid, 1.) + 1;
        var iseg = floor((seg - 1) / def(op.solid, 1.));

        th.PushRim(geo, {
            name: op.name,
            count: seg,
            repeat: op.rep,
            point: function (p, i2) {
                var i = floor(i2 / def(op.solid, 1.));

                if (op.sf[0] == 'x') p.x = -sin(rot_mig + i * 360. * deg / iseg) * op.w * 0.5 + op.x;
                if (op.sf[0] == 'y') p.y = -sin(rot_mig + i * 360. * deg / iseg) * op.w * 0.5 + op.y;
                if (op.sf[0] == 'z') p.z = -sin(rot_mig + i * 360. * deg / iseg) * op.w * 0.5 + op.z;

                if (op.sf[1] == 'x') p.x = -cos(rot_mig + i * 360. * deg / iseg) * op.d * 0.5 + op.x;
                if (op.sf[1] == 'y') p.y = -cos(rot_mig + i * 360. * deg / iseg) * op.d * 0.5 + op.y;
                if (op.sf[1] == 'z') p.z = -cos(rot_mig + i * 360. * deg / iseg) * op.d * 0.5 + op.z;

                if (op.sf.indexOf('x') == -1) p.x = op.x; if (op.sf.indexOf('y') == -1) p.y = op.y; if (op.sf.indexOf('z') == -1) p.z = op.z;

                return def(op.cus, cus)(p, op, i, i2);
            }
        }); return th;
    },

    PushCircleV2: function (geo, op, cus) {
        var th = this;

        cus = def(cus, function (p, op, i) { return p_ts(p, def(op.ts, {})); });
        op.w = def(op.w, 1.);
        op.d = def(op.d, 1.);
        op.x = def(op.x, 0.);
        op.y = def(op.y, 0.);
        op.z = def(op.z, 0.);
        op.edge = def(op.edge, 0.0);
        op.w -= op.edge;
        op.d -= op.edge;

        op.sf = def(op.sf, 'xz');

        var rot_mig = def(op.rot, 50.) * deg;
        var seg0 = def(op.s, 8);
        var seg = seg0 * def(op.solid, 1.) + 1;
        var iseg = floor((seg - 1) / def(op.solid, 1.));

        if (op.edge != 0) {
            seg = 2 * seg - 1;
        }
        function circleCalc(p, i, w, d) {
            if (op.sf[0] == 'x') p.x = -sin(rot_mig + i * 360. * deg / iseg) * w * 0.5;
            if (op.sf[0] == 'y') p.y = -sin(rot_mig + i * 360. * deg / iseg) * w * 0.5;
            if (op.sf[0] == 'z') p.z = -sin(rot_mig + i * 360. * deg / iseg) * w * 0.5;

            if (op.sf[1] == 'x') p.x = -cos(rot_mig + i * 360. * deg / iseg) * d * 0.5;
            if (op.sf[1] == 'y') p.y = -cos(rot_mig + i * 360. * deg / iseg) * d * 0.5;
            if (op.sf[1] == 'z') p.z = -cos(rot_mig + i * 360. * deg / iseg) * d * 0.5;

            if (op.edge == 0) {
                if (op.sf.indexOf('x') == -1) p.x = op.x; if (op.sf.indexOf('y') == -1) p.y = op.y; if (op.sf.indexOf('z') == -1) p.z = op.z;
            }

            return p;
        }

        th.PushRim(geo, {
            name: op.name,
            count: seg,
            repeat: op.rep,
            point: function (p, i3) {
                var i2 = i3;
                var ie = 0;
                var i = floor(i2 / def(op.solid, 2.));

                if (op.edge) {
                    ie = i % 2;
                    i = floor(i / 2);
                }

                var r_q = null;
                if (op.sf.indexOf('x') == -1) r_q = r_x;
                if (op.sf.indexOf('y') == -1) r_q = r_y;
                if (op.sf.indexOf('z') == -1) r_q = r_z;


                p = circleCalc(p, i, op.w, op.d);

                if (op.edge) {
                    var pi = circleCalc({ x: 0, y: 0, z: 0 }, i, op.edge, op.edge);

                    if (!ie) {
                        pi = r_q(pi, 360. * deg * 0.5 / seg0);

                        p.x += pi.x;
                        p.y += pi.y;
                        p.z += pi.z;

                    }
                    else {
                        pi = r_q(pi, -360. * deg * 0.5 / seg0);

                        p.x += pi.x;
                        p.y += pi.y;
                        p.z += pi.z;
                    }

                }

                p.x += op.x;
                p.y += op.y;
                p.z += op.z;

                return def(op.cus, cus)(p, op, i, i2);
            }
        }).Connect(geo);

        return th;
    }

    , PushLine: function (geo, op, cus) {
        var th = this;
        cus = def(cus, function (p, op, i) { return p_ts(p, def(op.ts, {})); });


        if (op.points && op.points[0] == '[') {
            op.points = JSON.parse(op.points);
        }

        var seg = op.points.length * def(op.solid, 1.);

        th.PushRim(geo, {
            count: seg,
            repeat: op.rep,
            point: function (p, i2) {
                var i = floor(i2 / def(op.solid, 1.));

                p.x = op.points[i].x;
                p.y = op.points[i].y;
                p.z = op.points[i].z;

                return cus(p, op, i, i2);
            }
        }); return th;
    }

};

function p_ts(p, ts) {

    var _ts = def(ts, {});
    p.x *= def(_ts.sx, 1.0);
    p.y *= def(_ts.sy, 1.0);
    p.z *= def(_ts.sz, 1.0);
    p.x *= def(_ts.sa, 1.0);
    p.y *= def(_ts.sa, 1.0);
    p.z *= def(_ts.sa, 1.0);

    _ts.rt = def(_ts.rt, 'xyz');
    for (var k = 0; k < 3; k++) {
        if (_ts.rt[k] == 'x')
            p = r_x(p, def(_ts.rx, 0), def(_ts.ce, { x: 0, y: 0, z: 0 }));
        else if (_ts.rt[k] == 'y')
            p = r_y(p, def(_ts.ry, 0), def(_ts.ce, { x: 0, y: 0, z: 0 }));
        else if (_ts.rt[k] == 'z')
            p = r_z(p, def(_ts.rz, 0), def(_ts.ce, { x: 0, y: 0, z: 0 }));
    }

    p.x += def(_ts.mx, 0.0);
    p.y += def(_ts.my, 0.0);
    p.z += def(_ts.mz, 0.0);

    _ts.rt2 = def(_ts.rt2, 'xyz');
    for (var k = 0; k < 3; k++) {
        if (_ts.rt2[k] == 'x')
            p = r_x(p, def(_ts.rx2, 0), def(_ts.ce2, { x: 0, y: 0, z: 0 }));
        else if (_ts.rt2[k] == 'y')
            p = r_y(p, def(_ts.ry2, 0), def(_ts.ce2, { x: 0, y: 0, z: 0 }));
        else if (_ts.rt2[k] == 'z')
            p = r_z(p, def(_ts.rz2, 0), def(_ts.ce2, { x: 0, y: 0, z: 0 }));
    }

    return p;
}


function r_la_spPCAD(p, s, e, y, sp) {

    var tar = {
        x: e.x - s.x,
        y: e.y - s.y,
        z: e.z - s.z
    };

    if (tar.x == 0 && tar.z == 0) {

        p = r_y(p, def(y, 0));

        if (tar.y > 0) {
            p = r_x(p, 180. * deg);
            p = r_y(p, 180. * deg);
        }

        p.x += sp.x;
        p.y += sp.y;
        p.z += sp.z;

        return p;
    }

    if (tar.x == 0) tar.x += 0.000001;
    if (tar.y == 0) tar.y += 0.000001;
    if (tar.z == 0) tar.z += 0.000001;

    var t1 = { x: -tar.x, y: tar.y, z: tar.z };
    var t2 = { x: -tar.x, y: tar.y, z: tar.z };

    t1 = (t1);

    var a = atan(t1.x / t1.z);

    t2 = (r_y(t2, a));
    var b = atan(t2.z / t2.y);

    p = r_x(p, (tar.y > 0 ? -1 : 1) * 90 * deg);

    var ang1 = 0, ang2 = 0, ang3 = 0;
    ang1 = -1 * (90 * deg - b);
    ang2 = -a;

    p = r_x(p, ang1);
    p = r_y(p, ang2);

    p.x += -sp.x;
    p.y += sp.y;
    p.z += sp.z;

    return p;
}


var AF = null;
var AFConnect = 0;
var AFSingle = null;
function ConnectStep(n, l, fun, a) {
    if (n == 0) AF = 0;
    if (a) AFSingle = 1;
    AFConnect = 0;
    AF = n;

    if (fun) fun(n, l);

    if (n < l)
        ConnectStep(++n, l, fun);
    else { AF = null; AFSingle = null; }
}



/// 

function def(a, d) {
    if (a != undefined && a != null) return (d != undefined && d != null ? a : true);
    else
        if (d != _null)
            return (d != undefined && d != null ? d : false);
    return null;
}

// math base 
var floor = Math.floor;
var sin = Math.sin;
var cos = Math.cos;
var tan = Math.tan;
var atan = Math.atan;
var asin = Math.asin;
var acos = Math.acos;
var pow = function (x, y) { return Math.pow(x, (y ? y : 2.)); }
var ceil = Math.ceil;
var abs = Math.abs;
var exp = Math.exp;
var log = Math.log;
var max = Math.max;
var min = Math.min;
var random = Math.random;

// 
function r3(x) { return floor(x * 1000) / 1000; }
function r2(x) { return floor(x * 100) / 100; }
function r1(x) { return floor(x * 10) / 10; }
function r_3(x) { return floor(x * 1000000) / 1000 }
function r_2(x) { return floor(x * 10000) / 100; }
function r_1(x) { return floor(x * 100) / 10; }


function rd(min, max) {
    return (random()) * (max - min) + min;
}

var round = Math.round;
var sqrt = Math.sqrt;
var PI = Math.PI;
var E = Math.E;

var deg = PI / 180.;
var rad = 180. / PI;



//  ver 1.0.01.003
function dim(v, u) {
    return sqrt(pow(u.x - v.x) + pow(u.y - v.y) + (def(u.z) ? pow(u.z - v.z) : 0));
}
function norm(v) {
    var x = v.x, y = v.y, z = v.z;
    var n = sqrt(x * x + y * y + z * z);

    if (n == 0) return { x: 0.1, y: 0.1, z: 0.1 };

    var invN = 1 / n;
    v.x *= invN;
    v.y *= invN;
    v.z *= invN;

    return v;
}
function sub(v, u) {
    return { x: u.x - v.x, y: u.y - v.y, z: u.z - v.z };
}
function dot(v, u) {
    return { x: u.x * v.x, y: u.y * v.y, z: u.z * v.z };
}
function cross(v, u) {
    var vx = v.x, vy = v.y, vz = v.z, x = u.x, y = u.y, z = u.z;
    var target = { x: 0, y: 0, z: 0 };

    target.x = ((y * vz) - (z * vy));
    target.y = ((z * vx) - (x * vz));
    target.z = ((x * vy) - (y * vx));

    return target;
}
function nott(v) {
    return { x: -1 * v.x, y: -1 * v.y, z: -1 * v.z };
}
function add(v, u) {
    return { x: u.x + v.x, y: u.y + v.y, z: u.z + v.z };
}
function rotate_xy(pr1, pr2, alpha) {
    pp2 = { x: pr2.x - pr1.x, y: pr2.y - pr1.y };

    return {
        x: pr1.x + pp2.x * cos(alpha) - pp2.y * sin(alpha),
        y: pr1.y + pp2.x * sin(alpha) + pp2.y * cos(alpha)
    };
}



function r_y(n, a, c) {

    c = def(c, { x: 0, y: 0, z: 0 });
    var c1 = { x: c.x, y: c.y, z: c.z };
    c1.x = c1.x;
    c1.y = c1.z;

    var p = rotate_xy(c1, { x: n.x, y: n.z }, a);

    n.x = p.x;
    n.z = p.y;

    return n;

}

function r_x(n, a, c) {

    c = def(c, { x: 0, y: 0, z: 0 });
    var c1 = { x: c.x, y: c.y, z: c.z };
    c1.x = c1.y;
    c1.y = c1.z;

    var p = rotate_xy(c1, { x: n.y, y: n.z }, a);

    n.y = p.x;
    n.z = p.y;

    return n;

}

function r_z(n, a, c) {

    c = def(c, { x: 0, y: 0, z: 0 });
    var c1 = { x: c.x, y: c.y, z: c.z };
    var p = rotate_xy(c1, { x: n.x, y: n.y }, a);

    n.x = p.x;
    n.y = p.y;

    return n;

}

var cln = (s, a, m, x) => {
    a = def(a, { x: 0, y: 0, z: 0 });
    m = def(m, { x: 0, y: 0, z: 0 });
    x = def(x, { x: 1, y: 1, z: 1 });

    var s = { x: s.x * x.x + a.x - m.x, y: s.y * x.y + a.y - m.y, z: s.z * x.z + a.z - m.z };
    if (abs(s.x) < 0.000001) s.x = 0;
    if (abs(s.y) < 0.000001) s.y = 0;
    if (abs(s.z) < 0.000001) s.z = 0;

    return s;
};


/** templates */
var GBT = { 
    SphareSurface: {
        Build: function (option /*{seg:number}*/, geo) { 
          
            if(!geo.part_spSurface){
            geo.part_spSurface = new GB.Part()
            .Create(function(option,custom){ 

            ind = 0;

            var setting = {};

            setting.s = option.seg.valueOf()*1;
            setting.s2 = option.seg_h.valueOf()*1 >0 ?option.seg_h.valueOf()*1: null ;
            
            setting.r = option.radius.valueOf()*1;
            setting.w = option.w_angle.valueOf()*1;
             setting.h = option.h_angle.valueOf()*1;
             setting.a = option.alpha_pos.valueOf()*1;
             setting.b = option.beta_pos.valueOf()*1;
             setting.c = option.landa_pos.valueOf()*1;
             setting.a1 = option.a_p1.valueOf()*1;
             setting.b1 = option.b_p1.valueOf()*1;
             setting.c1 = option.c_p1.valueOf()*1;
             setting.flip = option.flip ; 

            
             

            var rim = new GB.Rims();
            for (var j = 0; j < def(setting.s2, setting.s); j++) {
                rim.UV(function (p, i, n) {
                    return { u: 1. - j / n, v: i / n };
                }).PushRim(geo, {
                    count: setting.s,
                    point: function (p, i) {
                        count = setting.s - 1; 

                        p.x = sin(def(setting.a1, 0.) * deg + setting.w * 0.5 * deg - setting.w * deg * i / count) * (setting.r * cos(def(setting.b1, 0.) * deg + setting.h * 0.5 * deg - setting.h * deg * j / count));
                        p.z = cos(def(setting.a1, 0.) * deg + setting.w * 0.5 * deg - setting.w * deg * i / count) * (setting.r * cos(def(setting.b1, 0.) * deg + setting.h * 0.5 * deg - setting.h * deg * j / count));
                        p.y = sin(def(setting.b1, 0.) * deg + setting.h * 0.5 * deg - setting.h * deg * j / count) * setting.r;

                        p = r_y(p, setting.a * deg);
                        p = r_z(p, setting.b * deg);
                        p = r_z(p, def(setting.c, 0.) * deg);

                        return custom(p,option);
                    }
                });

                rim.Connect(geo,null,null,setting.flip);
            }
 

            
        }).Custom(function(p,op){ 
            return p_ts(p,def(option.ts,{})); 
        });}  

        geo.part_spSurface.New(option);
        },

        Param:{
            seg:30,
            seg_h:0,
            radius:10,
            w_angle:90 ,
            h_angle:90,
            alpha_pos:-45,
            beta_pos:0.0,
            landa_pos:0.,
            a_p1:0,
            b_p1:0,
            c_p1:0 ,
            hid_address:'SphareSurface'
        },
        Icon:'/tmp_sfsp.svg',
        export:function(el,th){
            return `GBT.SphareSurface.Build({
                seg:`+el.seg +`,seg_h:`+el.seg_h+`,
                radius:`+el.radius+`,  w_angle:`+el.w_angle+` ,h_angle:`+el.h_angle+`,
                alpha_pos:`+el.alpha_pos+`,beta_pos:`+el.beta_pos+`,landa_pos:`+el.landa_pos+`,
                a_p1:`+el.a_p1+`,b_p1:`+el.b_p1+`,c_p1:`+el.c_p1+` ,
                hid_ts: `+ th.ts(el.hid_ts )+`
             },geo);`;

             },
        init:function(){
            var th = this;
            var dv = document.createElement('div');
            dv.onclick = function(){
                addTreeStruct('img_'+th.Icon,'Template','Surface',null,GBT.SphareSurface.Param
             );
            }
            dv.className = ' fs-05 p-00125 pt-0025 c-hnavy rad-03  c-tgray2  f-center';

            dv.innerHTML = ` <img src='`+th.Icon+`' class=" w-01   h-01   fs-05     c-t-hwhite  c-tgray2  f-center "
               /> `;

             first('.gbt_templates').appendChild(dv);
        }
    },

    TubeSurface: {
        Build:  function (setting /*{seg:number}*/, geo) {

            console.log((setting.a-setting.w*0.5)*deg);

            ind = 0;
            
            var rim = new GB.Rims();
            for(var j =0;j<setting.s2;j++){
            rim.UV(function(p,i,s){ return {u:1.-i/(setting.s-1),v:j/(setting.s2-1)}}).PushRim(
                geo,
                {
                    count:setting.s,
                    point:function(p,i){
                        var count = setting.s-1;
                        p.x = sin((90-setting.b*1.0 - setting.h*0.5)*deg+i*setting.h*deg/count)*setting.r2;
                        p.y = cos((90-setting.b*1.0 - setting.h*0.5)*deg+i*setting.h*deg/count)*setting.r2;
                        if(p.x>0. )p.x += setting.t*0.5;
                        else p.x -= setting.t*0.5;
                         if(p.y>0. )p.y += setting.th*0.5;
                        else p.y -= setting.th*0.5;
         
                        p.x += setting.r; 
         
                        p = r_y(p, (setting.a-setting.w*0.5)*deg+ j*setting.w*deg/(setting.s2-1),{x:0,y:0,z:0});
         
                        return p_ts(p,def(setting.ts,{}));
                    }
                }
            );
            if( j != 0 ) rim.Connect(geo,null,null, !setting.flip );
            }
         } ,
         Param:{

            s:30,
            s2:30,

            r:10.,
            r2:1.,

            t:1.0,
            th:0.0,
                     
            w:45 ,
            h:10 ,

            a:0,
            b:0,
            
            hid_address:'TubeSurface'
        },
        Icon:'/tmp_sftu.svg',
        export:function(el,th){
            console.log(el);
            return `GBT.TubeSurface.Build({
                s:`+el.s +`,s2:`+el.s2+`,
                r:`+el.r+`,  r2:`+el.r2+`  ,
                t:`+el.t+`,  th:`+el.th+`  ,
                w:`+el.w+`,  h:`+el.h+`  ,
                a:`+el.a+`,  b:`+el.b+`  , 
                hid_ts: `+ th.ts(el.hid_ts )+`
             },geo);`;

             },
        init:function(){
            var th = this;
            var dv = document.createElement('div');
            dv.onclick = function(){
                addTreeStruct('img_'+th.Icon,'Template','TubeSurface',null,GBT.TubeSurface.Param
             );
            }
            dv.className = ' fs-05 p-00125 pt-0025 c-hnavy rad-03  c-tgray2  f-center';

            dv.innerHTML = ` <img src='`+th.Icon+`' class=" w-01   h-01   fs-05     c-t-hwhite  c-tgray2  f-center "
               /> `;

             first('.gbt_templates').appendChild(dv);
        }
    },
    Plane: {
        Build: function (option /*{seg:number}*/, geo) { 
          
            if(!geo.part_plane){
            geo.part_plane = new GB.Part()
            .Create(function(option,custom){ 

            ind = 0;

            var setting = {};

            setting.s =  (option.seg.valueOf()*1 );
            setting.w =  (option.width.valueOf()*1 ) ;
            setting.h =  (option.height.valueOf()*1 ) ;
            setting.s2 =  (option.seg_h.valueOf()*1 ) ;

           
               
            var rim = new GB.Rims();
            for (var j = 0; j < setting.s2 ; j++) {
                rim.UV(function (p, i, n) {
                    return { u: 1. - j / n, v: i / n };
                }).PushRim(geo, {
                    count: setting.s,
                    point: function (p, i) {
                        count = setting.s - 1;  

                        p.x = setting.w*i/count - setting.w*0.5;
                        p.z = setting.h*j/count - setting.h*0.5;
 
                                                 
                        return custom(p,option);
                    }
                });

                if(j>0)
                rim.Connect(geo,null,null,setting.flip);
            } 

            
        }).Custom(function(p,op){ 
            return p_ts(p,def(option.ts,{})); 
        });} 

        geo.part_plane.New(option);
        },

        Param:{
            seg:2,
            seg_h:2,
            
            width:1 ,
            height:1 ,
            
            hid_address:'Plane'
        },
        Icon:'/tmp_sfsq.svg',
        export:function(el,th){
            return `GBT.Plane.Build({
                seg:`+el.seg +`,seg_h:`+el.seg_h+`,
                width:`+el.width+`,  height:`+el.height+`  ,
                hid_ts: `+ th.ts(el.hid_ts )+`
             },geo);`;

             },
        init:function(){
            var th = this;
            var dv = document.createElement('div');
            dv.onclick = function(){
                addTreeStruct('img_'+th.Icon,'Template','Plane',null,GBT.Plane.Param
             );
            }
            dv.className = ' fs-05 p-00125 pt-0025 c-hnavy rad-03  c-tgray2  f-center';

            dv.innerHTML = ` <img src='`+th.Icon+`' class=" w-01   h-01   fs-05     c-t-hwhite  c-tgray2  f-center "
               /> `;

             first('.gbt_templates').appendChild(dv);
        }
    },
    Cube: {
        Build: function (option /*{seg:number}*/, geo) { 
          
            if(!geo.part_Cube){
            geo.part_Cube = new GB.Part()
            .Create(function(option,custom){ 

            ind = 0;

            var setting = {};

            setting.s =  (option.seg_w.valueOf()*1 );
            setting.w =  (option.width.valueOf()*1 ) ;
            setting.h =  (option.height.valueOf()*1 ) ;
            setting.l =  (option.height.valueOf()*1 ) ;
            setting.s2 =  (option.seg_h.valueOf()*1 ) ;
            setting.s3 =  (option.seg_l.valueOf()*1 ) ;  
               
            var rim = new GB.Rims();
            for(var v = -1;v <= 1;v+=2.){
                for (var j = 0; j < setting.s2 ; j++) {
                    rim.UV(function (p, i, n) {
                    return { u: 1. - j / n, v: i / n };
                }).PushRim(geo, {
                    count: setting.s,
                    point: function (p, i) {
                        count = setting.s - 1;  
                        count2 = setting.s2 - 1;  

                        p.x = setting.w*i/count - setting.w*0.5;
                        p.z = setting.h*j/count2 - setting.h*0.5;
                        p.y = v*setting.l*0.5; 
                                                 
                        return custom(p,option);
                    }
                });

                if(j>0)
                rim.Connect(geo,null,null,v>0?setting.flip:!setting.flip);
            }
        }

        for(var v = -1;v <= 1;v+=2.){
            for (var j = 0; j < setting.s3 ; j++) {
                rim.UV(function (p, i, n) {
                return { u: 1. - j / n, v: i / n };
            }).PushRim(geo, {
                count: setting.s,
                point: function (p, i) {
                    count = setting.s - 1;  
                    count2 = setting.s3 - 1;  

                    p.x = setting.w*i/count - setting.w*0.5;
                    p.z = v*setting.h* 0.5;
                    p.y =  setting.l*j/count2 - setting.l*0.5;
                                             
                    return custom(p,option);
                }
            });

            if(j>0)
            rim.Connect(geo,null,null,v>0?!setting.flip:setting.flip);
        }
    }

    for(var v = -1;v <= 1;v+=2.){
        for (var j = 0; j < setting.s3 ; j++) {
            rim.UV(function (p, i, n) {
            return { u: 1. - j / n, v: i / n };
        }).PushRim(geo, {
            count: setting.s2,
            point: function (p, i) {
                count = setting.s2 - 1;  
                count2 = setting.s3 - 1;  

                p.x = v*setting.w* 0.5;
                p.z = setting.h*i/count - setting.h*0.5;
                p.y =   setting.l*j/count2 - setting.l*0.5;
                                         
                return custom(p,option);
            }
        });

        if(j>0)
        rim.Connect(geo,null,null,v>0?setting.flip:!setting.flip);
    }
}

            
        }).Custom(function(p,op){ 
            return p_ts(p,def(option.ts,{})); 
        });} 

        geo.part_Cube.New(option);
        },

        Param:{
            seg_w:3,
            seg_h:3,
            seg_l:3,
            
            width:1 ,
            height:1 ,
            length:1 ,
            
            hid_address:'Cube'
        },
        Icon:'/tmp_cube.svg',
        export:function(el,th){
            return `GBT.Cube.Build({
                seg_w:`+el.seg_w +`,seg_h:`+el.seg_h+`, seg_l:`+el.seg_l+`,
                width:`+el.width+`,  height:`+el.height+` ,  length:`+el.length+`  ,
                hid_ts: `+ th.ts(el.hid_ts )+`
             },geo);`;

             },
        init:function(){
            var th = this;
            var dv = document.createElement('div');
            dv.onclick = function(){
                addTreeStruct('img_'+th.Icon,'Template','Cube',null,GBT.Cube.Param
             );
            }
            dv.className = ' fs-05 p-00125 pt-0025 c-hnavy rad-03  c-tgray2  f-center';

            dv.innerHTML = ` <img src='`+th.Icon+`' class=" w-01   h-01   fs-05     c-t-hwhite  c-tgray2  f-center "
               /> `;

             first('.gbt_templates').appendChild(dv);
        }
    }, 
    Sphare: {
        Build: function (option /*{seg:number}*/, geo) { 
          
            if(!geo.part_Sphare){
            geo.part_Sphare = new GB.Part()
            .Create(function(option,custom){ 

            ind = 0;

            var setting = {};

            setting.s =  (option.seg.valueOf()*1 );
            setting.radius =  (option.radius.valueOf()*1 ) ;  
               
            var rim = new GB.Rims();
            
                for (var j = 0; j < setting.s  ; j++) {
                    rim.UV(function (p, i, n) {
                    return { u: 1. - j / n, v: i / n };
                }).PushRim(geo, {
                    count: setting.s,
                    point: function (p, i) {
                        count = setting.s - 1;  
                        
                        p.x = sin(i*deg*180./count)*setting.radius ;
                        p.y = cos(i*deg*180./count)*setting.radius ;
                       
                        p = r_y(p,j*360.*deg/count );
                                                 
                        return custom(p,option);
                    }
                });

                if(j>0)
                rim.Connect(geo,null,null, setting.flip);
             
             } 

            
            
        }).Custom(function(p,op){ 
            return p_ts(p,def(option.ts,{})); 
        });} 
        
        geo.part_Sphare.New(option);
        },

        Param:{
            seg:30,
            radius:10, 
            hid_address:'Sphare'
        },
        Icon:'/tmp_sphare.svg',
        export:function(el,th){
            return `GBT.Sphare.Build({
                seg :`+el.seg  +`,radius:`+el.radius+`   ,
                hid_ts: `+ th.ts(el.hid_ts )+`
             },geo);`;

             },
        init:function(){
            var th = this;
            var dv = document.createElement('div');
            dv.onclick = function(){
                addTreeStruct('img_'+th.Icon,'Template','Sphare',null,GBT.Sphare.Param
             );
            }
            dv.className = ' fs-05 p-00125 pt-0025 c-hnavy rad-03  c-tgray2  f-center';

            dv.innerHTML = ` <img src='`+th.Icon+`' class=" w-01   h-01   fs-05     c-t-hwhite  c-tgray2  f-center "
               /> `;

             first('.gbt_templates').appendChild(dv);
        }
    },
    Tube: {
        Build: function (option /*{seg:number}*/, geo) { 
          
            if(!geo.part_Tube){
            geo.part_Tube = new GB.Part()
            .Create(function(option,custom){ 

            ind = 0;

            var setting = {};

            setting.s =  (option.seg.valueOf()*1 );
            setting.radius =  (option.radius.valueOf()*1 ) ;  
            setting.radius2 =  (option.thickness.valueOf()*1 ) ;  
            setting.radius3 =  (option.thickness_in.valueOf()*1 ) ;  
            setting.st =  (option.start.valueOf()*1 ) ;  
            setting.ed =  (option.end.valueOf()*1 ) ;  
               
            var rim = new GB.Rims();
            
                for (var j = 0; j < setting.s  ; j++) {
                    rim.UV(function (p, i, n) {
                    return { u: 1. - j / n, v: i / n };
                }).PushRim(geo, {
                    count: setting.s+1,
                    point: function (p, i) {
                        count =  setting.s - 1 ;  

                         
                        
                        p.x = setting.radius+ sin(i*deg*360./count)*setting.radius2 ;
                        p.y = cos(i*deg*360./count)*setting.radius2 ;
                       
                        p = r_y(p,-setting.st*deg+j*(setting.ed-setting.st)*deg/count );
                                                 
                        return custom(p,option);
                    }
                });

                if(j>0)
                rim.Connect(geo,null,null, setting.flip);
             
             } 
             j = setting.s-1; 
             rim.PushRim(geo, {
                count: setting.s+1,
                point: function (p, i) {
                    count =  setting.s - 1 ;   
                    
                    p.x = setting.radius+ sin(i*deg*360./count)*setting.radius2 ;
                    p.y = cos(i*deg*360./count)*setting.radius2 ;
                   
                    p = r_y(p,-setting.st*deg+j*(setting.ed-setting.st)*deg/count );
                                             
                    return custom(p,option);
                }
            });
            rim.PushRim(geo, {
                count: setting.s+1,
                point: function (p, i) {
                    count =  setting.s - 1 ;  
                    
                    p.x = setting.radius+ sin(i*deg*360./count)*setting.radius3 ;
                    p.y = cos(i*deg*360./count)*setting.radius3 ;
                   
                    p = r_y(p,-setting.st*deg+j*(setting.ed-setting.st)*deg/count );
                                             
                    return custom(p,option);
                }
            }).Connect(geo,null,null,  setting.flip);

            j = 0; 
            rim.PushRim(geo, {
               count: setting.s+1,
               point: function (p, i) {
                   count =  setting.s - 1 ;   
                   
                   p.x = setting.radius+ sin(i*deg*360./count)*setting.radius2 ;
                   p.y = cos(i*deg*360./count)*setting.radius2 ;
                  
                   p = r_y(p,-setting.st*deg+j*(setting.ed-setting.st)*deg/count );
                                            
                   return custom(p,option);
               }
           });
           rim.PushRim(geo, {
               count: setting.s+1,
               point: function (p, i) {
                   count =  setting.s - 1 ;  
                   
                   p.x = setting.radius+ sin(i*deg*360./count)*setting.radius3 ;
                   p.y = cos(i*deg*360./count)*setting.radius3 ;
                  
                   p = r_y(p,-setting.st*deg+j*(setting.ed-setting.st)*deg/count );
                                            
                   return custom(p,option);
               }
           }).Connect(geo,null,null,  !setting.flip);


             for (var j = setting.s-1; j >=0  ; j--) {
                rim.UV(function (p, i, n) {
                return { u: 1. - j / n, v: i / n };
            }).PushRim(geo, {
                count: setting.s,
                point: function (p, i) {
                    count = setting.s - 1;  
                    
                    p.x = setting.radius+ sin(i*deg*360./count)*setting.radius3 ;
                    p.y = cos(i*deg*360./count)*setting.radius3 ;
                   
                    p = r_y(p,-setting.st*deg+j*(setting.ed-setting.st)*deg/count );
                                             
                    return custom(p,option);
                }
            });

             if(j != setting.s-1)
            rim.Connect(geo,null,null,  setting.flip);
         
         } 

            
            
        }).Custom(function(p,op){ 
            return p_ts(p,def(option.ts,{})); 
        });}  

        geo.part_Tube.New(option);
        },

        Param:{
            seg:30,
            radius :10, 
            thickness:2, 
            thickness_in:0.0, 
            start:0, 
            end:360, 
            
            hid_address:'Tube'
        },
        Icon:'/tmp_tube.svg',
        export:function(el,th){
            return `GBT.Tube.Build({
                seg :`+el.seg  +`,radius:`+el.radius+`,
                thickness:`+el.thickness+`   ,thickness_in:`+el.thickness_in+`   ,
                start:`+el.start  +`,end:`+el.end  +`,
                hid_ts: `+ th.ts(el.hid_ts )+`
             },geo);`;

             },
        init:function(){
            var th = this;
            var dv = document.createElement('div');
            dv.onclick = function(){
                addTreeStruct('img_'+th.Icon,'Template','Tube',null,GBT.Tube.Param
             );
            }
            dv.className = ' fs-05 p-00125 pt-0025 c-hnavy rad-03  c-tgray2  f-center';

            dv.innerHTML = ` <img src='`+th.Icon+`' class=" w-01   h-01   fs-05     c-t-hwhite  c-tgray2  f-center "
               /> `;

             first('.gbt_templates').appendChild(dv);
        }
    },





}; 

GB.CatchPoints = function (res,scl,corr,fun) {
    var path = res;
    path.array = GB.CorrectRimPoints(path.array,corr);
    var sepAr1 = GB.SeprateRimPoints(path.array,'end_');

    var rim = new GB.Rims();
    var pts = [];
    for (var i = 0; i < sepAr1.length; i++) {
      if (!pts[i]) pts[i] = [];
      GB.RimPoints(1.,function (p) {
        p.x *= scl;
        p.y *= scl;
        p.z *= scl;

        pts[i].push(fun(p,i));

      },sepAr1[i].points,1);
    }
    return { points: pts,path: sepAr1 };
  };

  GB.getBC_Points = function (ax,ay,bx,by,cx,cy,dx,dy,n,fun) {
    var pts = [];

    for (var i = 0; i < n; i++) {
      var t = i / n;
      var B0_t = pow(1 - t,3);
      var B1_t = 3 * t * pow(1 - t);
      var B2_t = 3 * pow(t) * (1 - t);
      var B3_t = pow(t,3);

      var px_t = (B0_t * ax) + (B1_t * bx) + (B2_t * cx) + (B3_t * dx);
      var py_t = (B0_t * ay) + (B1_t * by) + (B2_t * cy) + (B3_t * dy);

      var B0_dt = -3 * pow(1 - t);
      var B1_dt = 3 * pow(1 - t) - 6 * t * (1 - t);
      var B2_dt = - 3 * pow(t) + 6 * t * (1 - t);
      var B3_dt = 3 * pow(t);

      var px_dt = (B0_dt * ax) + (B1_dt * bx) + (B2_dt * cx) + (B3_dt * dx);
      var py_dt = (B0_dt * ay) + (B1_dt * by) + (B2_dt * cy) + (B3_dt * dy);

      var slope = Math.atan2(py_dt,px_dt);

      if (fun) fun({ x: px_t,y: 0.,z: py_t,s: slope },i / n);
      else pts.push({ x: px_t,y: 0.,z: py_t,s: slope });
    }

    return pts;
  };
  GB.RimPoints = function (scale,fun,pts,getEnd) {


    var res = [];
    for (var i = 0; i < pts.length - 1; i++) {
      var pt = pts[i];
      var isArc = false;
      if ((pt.m && pt.m.toLowerCase() == 'arc')
        || (i < pts.length - 1 && pts[i + 1] && pts[i + 1].m && pts[i + 1].m.toLowerCase() == 'arc')) {

        for (var j = 0; j < def(pt.r,1); j++) {

          GB.getBC_Points(pt.x,pt.z,pt.x + pt.lx,pt.z + pt.lz,
            pts[i + 1].x + pts[i + 1].rx,pts[i + 1].z + pts[i + 1].rz,pts[i + 1].x,pts[i + 1].z,
            pt.s * (pt.c ? pt.c : 1),function (p,v) {

              res.push(fun({ x: p.x,y: 0,z: p.z,ind: i,stop: pt.e },
                i,v,j / def(pt.r,1),0));
            });
        }
      }
      else {

        for (var j = 0; j < def(pt.r,1); j++) {

          for (var v = 0; v < pt.s * (pt.c ? pt.c : 1); v++) {

            var yk = v / (pt.s * (pt.c ? pt.c : 1));

            res.push(fun({
              x: pt.x * (1. - yk) + (yk) * pts[i + 1].x,
              y: 0,
              z: pt.z * (1. - yk) + (yk) * pts[i + 1].z,
              ind: i,
              stop: pt.e
            },i,yk,j / def(pt.r,1),0));
          }
        }
      }
    }
    if (getEnd) {
      for (var j = 0; j < def(pts[pts.length - 1].r,1); j++) {

        res.push(fun({
          x: pts[pts.length - 1].x,
          y: 0,
          z: pts[pts.length - 1].z,
          ind: i,
          stop: pts[pts.length - 1].e
        },pts.length - 1,0,j / (def(pts[pts.length - 1].r,1)),1));
      }
    }
    return res;

  };

  GB.SeprateRimPoints = function (array,ed) {
    var slitedArray = [];
    var arry = 0;
    for (var i = 0; i < array.length; i++) {

      if (!slitedArray[arry]) slitedArray[arry] = { points: [] };

      n_1(slitedArray).points.push(array[i]);

      if (array[i].m && array[i].m.startsWith(ed)) {
        slitedArray[arry].name = array[i].m.replace(ed,'');
        arry++;
      }
    }
    return slitedArray;
  };

  GB.CorrectRimPoints = (arr,l) => {

    for (var i = 0; i < arr.length; i++) {

      for (var j = 0; j < arr.length; j++) {
        if (i != j &&
          sqrt(pow(arr[i].x - arr[j].x) + pow(arr[i].z - arr[j].z)) < l) {

          arr[i].x = arr[j].x;
          arr[i].z = arr[j].z;

        }
      }
    }
    return arr;
  };

  GB.CreateSepratedRims = function (geo,rim,rimPoint,nm,fun,uvFun,stpEnd) {
    var rimNames = [];
    var nextRimStop = false;
    function makeRims(pts,p,d,i,y) {
      if (nextRimStop) { nextRimStop = false; return NaN; }
      if (p.stop) { nextRimStop = true; }

      rim.UV(uvFun).PushRim(geo,{
        count: pts.length + 1,
        name: 'rim_' + d + nm + i,
        point: function (ps,j) {
          if (j == pts.length) {

            ps.x = p.x;
            ps.y = p.y;
            ps.z = p.z;
          } else {
            ps.x = pts[j].x;
            ps.y = pts[j].y;
            ps.z = pts[j].z;
          }
          return y(ps);
        },
        repeat: 1
      });

      return 'rim_' + d + nm + i;
    }

    var rim_points = [];
    var prvInd;
    var lastInd = 0; var p1 = { x: 0,y: 0,z: 0 };
    var res = GB.RimPoints(1,function (p,i,a,b,e) {

      lastInd = i;
      p1 = p;
      if (!rim_points[i]) {
        var pv = prvInd;
        prvInd = i;
        if (rim_points[pv])
          rimNames.push(makeRims(rim_points[pv],p,rimPoint.name,pv,fun));

        rim_points[i] = [];
      }
      rim_points[i].push(p);
      return p;
    },rimPoint.points,stpEnd);

    rimNames.push(makeRims(n_1(rim_points),n_1(n_1(rim_points)),rimPoint.name,lastInd,fun));

    return rimNames;
  };

  GB.RimExactPoints = function (geo,arr) {
    var ptss = [{ points: [] }];
    GB.CatchRimsPoints(geo,arr,function (p) { ptss[0].points.push(p); return p; });
    return ptss;
  };

  GB.CatchRimsPoints = function (geo,rimPoint,fun) {
    var rimNames = [];
    function makeRims(pts,p,d,i,y) {
      /* if (p.stop) return NaN;*/

      for (var j = 0; j < pts.length + 1; j++) {
        var ps = { x: 0,y: 0,z: 0 };
        if (j == pts.length) {
          ps.x = p.x;
          ps.y = p.y;
          ps.z = p.z;
        } else {
          ps.x = pts[j].x;
          ps.y = pts[j].y;
          ps.z = pts[j].z;
        }
        y(ps);
      }
    }

    var rim_points = [];
    var prvInd;
    var lastInd = 0; var p1 = { x: 0,y: 0,z: 0 };
    var res = GB.RimPoints(1,function (p,i,a,b,e) {

      lastInd = i;
      p1 = p;
      if (!rim_points[i]) {
        var pv = prvInd;
        prvInd = i;
        if (rim_points[pv])

          makeRims(rim_points[pv],p,rimPoint.name,pv,fun);

        rim_points[i] = [];
      }
      rim_points[i].push(p);
      if (e) fun(p);
      return p;
    },rimPoint.points,1);

  };

  var $$GB = function (array) {

    this.list = array;

};

/** new line can be replace by "\n" */
var NL = `
`;

 


$$GB.prototype = {
    engine_init: function (geo) {
        // make model
    },
    mesh: null,
    list: [],
    body: "",
    settingTerm:'_params',
    attachSettingTerm:1,
    rim :'_rim',
    cus :'_cus',
    
    createScript: function (exp  ) { 

        var th = this;   

        if(exp){
            th.settingTerm = exp.param;
            th.cus = exp.cus;
            
            th.attachSettingTerm = false;
        } 


        th.body =  (th.attachSettingTerm  ? NL+'var '+th.settingTerm+' = def(setting, '+th.getSetting()+' );'+NL+
         `if(`+th.settingTerm+`.flip == undefined ) `+ th.settingTerm+`.flip = true;`  :
        NL +th.settingTerm+' = def('+th.settingTerm+', '+th.getSetting()+' );')+
        NL+
        ` var `+th.rim+` = new GB.Rims();`+
        
        (th.attachSettingTerm? ` var `+th.cus+` = function(p,op){op = def(op,{}); p = p_ts(p,def(op ,{})); return p;};`:'');
 
        // get setting
        for (var i in th.list) {
            i = th.list[i]; 

            if (i && th.rims[i.dis_type]  ) {

             
                th.body += NL+`/* id:` + i.id + `     [ `+i.title+` ] */`+
                NL+ th.rims[i.dis_type](i,th,exp) +
                NL;
            }
        }

          return (th.body.replaceAll('$$.',th.settingTerm+'.')); 
 
    },
    ts:function(op){
        var s = '{';
        if(op.mx) s+= 'mx:'+op.mx+',';
        if(op.my) s+= 'my:'+op.my+',';
        if(op.mz) s+= 'mz:'+op.mz+',';
        if(op.rx) s+= 'rx:'+op.rx+',';
        if(op.ry) s+= 'ry:'+op.ry+',';
        if(op.rz) s+= 'rz:'+op.rz+',';
        if(op.sx && op.sx != 1) s+= 'sx:'+op.sx+',';
        if(op.sy && op.sy != 1) s+= 'sy:'+op.sy+',';
        if(op.sz && op.sz != 1) s+= 'sz:'+op.sz+',';
        if(op.sa && op.sa != 1) s+= 'sa:'+op.sa+','; 
        

        return (s+'}').replace(',}','}');
    },
    part_param:function(op){
        var s = '{'; 

        for(var i in op.param){ 
            s+= i+':'+JSON.stringify(op.param[i])+','; 
        }

        return (s+'}').replace(',}','}');
    },
    ignoreSettingItems: ['dis_type','point', 'hid_addProperty', 'hid_str', 'hid_ts', 'id', 'title'],
    getSetting: function (jsonOut) {
        var th = this;

        var json = {};
        var str = '{';

        for (var i in th.list) {
            i = th.list[i];

            if (i && i.dis_type == "Setting") {
                json[i.title.toLocaleLowerCase()] = {};
                str+=i.title.toLocaleLowerCase()+':{';
                for (var prp in i) {

                    var prpValue = i[prp];  

                    if (prp && th.ignoreSettingItems &&
                        th.ignoreSettingItems.indexOf(prp) == -1) { 
                            

                        prp = prp.substring(prp.indexOf('_') != -1 ? prp.indexOf('_') + 1 : 0);
                        str += NL+'"'+prp+'":'+js(prpValue)+',';

                        json[i.title.toLocaleLowerCase()][prp] = prpValue;
                    }
                }
                str+= '},';
            }
        }

        return jsonOut? json : (str+'}').replaceAll(',}','}');
    },
    rims: {

       Rim: function (el,th) {
        
            return th.rim+`.PushRim(geo,{
 name: 'rim_`+el.id+`',
 count:`+el.count*def(el.step,1)*(def(el.bol_duplicate,0.)?2:1)+`,
 point: function(p,_i){ var i = floor(_i/(`+(def(el.bol_duplicate,0.)?2:1)+`));
    var count = `+el.count*def(el.step,1)+`; var c = count-1;var step = floor(i/(count/def(`+el.step+`,1.)));var step_i =  (i%(count/def(`+el.step+`,1.)));var step_c =  floor(count/def(`+el.step+`,1.)-1) ; `+(el.bol_step_cut?stepCupForRim():'')+el.point.replace('~(p)','').replaceAll('$$.',th.settingTerm+'.').replaceAll(`
`, `
    `)+` 
     return `+def(el.cus,th.cus)+`(p,mix({ts:def(`+th.settingTerm+`.ts,{})},`+ th.ts(el.hid_ts )+`,1));

 }
 })` + (el.ref_connect && el.ref_connect != '-1' ? '.Connect(geo,null,"rim_'+el.ref_connect+'",'+th.settingTerm+'.bol_flip);' : ';' );
        },
        Circle: function (el,th) {

            return th.rim+`.PushCircle`+(el.edge>0.00?'V2':'')+`(geo,{
        name: 'rim_`+el.id+`', 
        w:`+el.w+`,d:`+el.d+` , solid:`+el.solid+`,edge:`+el.edge+`,s:`+el.s+`,rot:`+el.rot+`,sf:'`+el.sf+`', 
        cus: function(p){ return `+def(el.cus,th.cus)+`(p,mix({ts:def(`+th.settingTerm+`.ts,{})},`+ th.ts(el.hid_ts )+`,1));} })`
        + (el.ref_connect && el.ref_connect != '-1' ? NL+'      .Connect(geo,null,"rim_'+el.ref_connect+'",'+th.settingTerm+'.bol_flip);' : ';' );
                     
        },
        code: function (el,th) {

            return  ' var code_'+el.id+` = new GB.Part()
            .Create(function(option,custom){ 
                `+el.main.replace('~(p)','')+`
            })
            .Custom(function(p,option){ return p_ts(p,def(option.ts,{})); });
            
            code_`+el.id+`.New( mix(`+el.param+`,{ts:`+th.ts(el.hid_ts )+`},1));
            `;    
        },
        Square: function (el,th) {
        return th.rim+`.PushSquare(geo,{
            name: 'rim_`+el.id+`', 
            w:`+el.w+`,d:`+el.d+` , solid:`+el.solid+`  ,rot:`+el.rot+`,sf:'`+el.sf+`', 
            cus: function(p){ return `+def(el.cus,th.cus)+`(p,mix({ts:def(`+th.settingTerm+`.ts,{})},`+ th.ts(el.hid_ts )+`,1));} })`
            + (el.ref_connect && el.ref_connect != '-1' ? NL+'      .Connect(geo,null,"rim_'+el.ref_connect+'",'+th.settingTerm+'.bol_flip);' : ';' );
                     
        },
        Template : function(el,th){
            return GBT[el.hid_address].export(el,th);
        },
        Part: function (el,th,exp) { 

           var partIns = "part_"+  el.hid_part_ref ;

           if(exp && exp.pTerm){
            var partTerm = exp.pTerm;
            var partIns = def(partTerm,'part_') + el.hid_part_ref  + (partTerm && partTerm[partTerm.length-1]=='['?']':'');
           }  
           var param = th.part_param(el);
           
            return   partIns+`.New( mix(`+param+`, {ts: `+ th.ts(el.hid_ts )+`},1) );`;  
        },
        Line: function (el) {
            return `line`;
        },
        Connect: function (el) {
            return `connect`;
        },
    },

};


  var Celer3D = function(){

  }

  Celer3D.prototype  = {
    builder:null,
    builders:null,
    jsonParams:{},
    model:null,
    Generate: function(setting,Builder_function){

        this.builder = Builder_function;


        this.model = new BABYLONX.Geometry(GB.GeometryBase(setting, this.builder ))
        return this;
    },
    Download:function(path,callBack){

        function handler() {
            
            if (this.readyState == this.DONE) {
              if (this.status == 200) {
                // success!
                callBack(this.responseText);
              } else {
                callBack(null);
              } 
            }
          }

        var client = new XMLHttpRequest();
  
        client.onreadystatechange = handler;
        client.open('GET', path);
        client.setRequestHeader('Access-Control-Allow-Origin','*');
        
        client.send();
        client.onprogress = function(pe) {
          
        };

    },
    FileToBuilder: function(file,callBack){

        this.Download(file,function(d){
            if(d){
                try{

                    if(d.indexOf('_~part~_')){
                        d = atob(d.split('_~part~_')[0].replace('data:text/plain;charset=UTF-8;',''));
                        console.log(d);

                        d = JSON.parse(d);

                    } else {
                        d = JSON.parse(d.split(' part_base ')[0]); 
                    } 
                    
                    var model =  new $$GB(d);
                    var sc =  js((' function(setting,geo){'+ model.createScript( )+'}')
                    .replaceAll('.bol_flip','.flip').replaceAll(NL,NL+'         '));
                    var st = js(model.getSetting());

                    console.log( sc);
                    st.flip = true;

                    
                    callBack(sc,st);

                } catch(e){ 
                    console.log('compile Error : File Cant be Compile!',e);
                     
                }  
            } 
        })  
    },
    GenerateByFile: function(path ,setting , callBack){ 
        var th = this;
        
        this.FileToBuilder(path ,function(builder,setting){ 
            
            callBack(th,builder,setting);
        }) ;
       
        return this;

    },
    ToMesh :function(scene){
        return  this.model.toMesh(scene);
    }
  }




 


