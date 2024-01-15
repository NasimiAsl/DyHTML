
GB.uvs = {};
GB.rims = {
    point: function (op) {
        return {
            count: 1, point: function (p, i) {
                op.cus = def(op.cus, function (p, op) { op = def(op, {}); return p_ts(p, def(op.ts, {})) });
                p.x = op.x;
                p.y = op.y;
                p.z = op.z;
                return op.cus(p);
            }
        }
    },
    line2P: function (op) {
        return {
            count: 2, point: function (p, i) {
                op.cus = def(op.cus, function (p, op) { op = def(op, {}); return p_ts(p, def(op.ts, {})) });
                if (i == 0) { p.x = op.p1.x; p.y = op.p1.y; p.z = op.p1.z; }
                else { p.x = op.p2.x; p.y = op.p2.y; p.z = op.p2.z; }
                return op.cus(p);
            }
        }
    },
    nurbsRim : function  (geo,rim,ref,ur,un,ps1,ps2,op){ 
         
        var vj = 1.-op.v;

        var dps1 = {
            x:ps1[ps1.length-1].x - ps1[0].x,
            y:ps1[ps1.length-1].y - ps1[0].y,
            z:ps1[ps1.length-1].z - ps1[0].z  
        };

      var lps1 = pow(pow(dps1.x)+pow(dps1.y)+pow(dps1.z),0.5);

        var  dps2 = {
            x:ps2[ps2.length-1].x - ps2[0].x,
            y:ps2[ps2.length-1].y - ps2[0].y,
            z:ps2[ps2.length-1].z - ps2[0].z  
        };

      var lps2 = pow(pow(dps2.x)+pow(dps2.y)+pow(dps2.z),0.5);


       rim.UV(function(p,i,s){ return {u:vj,v:i/s}}).PushRim(geo,{
           count:ps1.length ,
           point:function(p,i){ 


               var u = 0;var ref3,ref4;
               for(var j =un.length-1;j>0;j--){
                   var u1 = i /(ps1.length-1);
                   if(u1 <= un[j]  ){
                       u = (u1 - un[j-1])/(un[j]-un[j-1]);
                       ref3 = ref[ur[j-1]];
                       ref4 = ref[ur[j]];   
                   }
               }    

              

               var opp = {
                   x: u*(ref4[op.index].x)+(1.-u)*(ref3[op.index].x),
                   y: u*(ref4[op.index].y)+(1.-u)*(ref3[op.index].y),
                   z: u*(ref4[op.index].z)+(1.-u)*(ref3[op.index].z)
               }; 

                var vps2 =    i/(ps2.length-1)  ;
                if(ur[0] == ur[1] && ur.length == 2){
                    vps2 = 0;
                }

               var p2 =  {
                   x:-ps2[0].x+ps2[i].x-vps2*dps2.x,
                   y:-ps2[0].y+ps2[i].y-vps2*dps2.y,
                   z:-ps2[0].z+ps2[i].z-vps2*dps2.z, 
               } ; 

               GB.h_p(geo,cln(p2),0.001);

                var vps1 =    i/(ps1.length-1);
                if(ur[0] == ur[1] && ur.length == 2){
                    vps1 = 0;
                }

                var p1 = {
                   x:-ps1[0].x+ps1[i].x-vps1*dps1.x,
                   y:-ps1[0].y+ps1[i].y-vps1*dps1.y,
                   z:-ps1[0].z+ps1[i].z-vps1*dps1.z, 
                } ; 

               p.x += opp.x+(1.-vj)*p2.x + vj*p1.x;
               p.y += opp.y+(1.-vj)*p2.y + vj*p1.y;
               p.z += opp.z+(1.-vj)*p2.z + vj*p1.z;  
               
               return p_ts(p,def(op.ts,{ }));
           }  
       })  ; 
    } ,
    surface(geo,rim,ps1,ps2,op){

        for(var j=0;j<= op.seg;j++){

            var vj = 1.-j/op.seg ; 

        rim.UV(function(p,i,s){ return {u:vj,v:i/s}}).PushRim(geo,{
            count:ps1.length,
            point:function(p,i){

                var p1 = p_ts({
                    x:ps1[i].x,
                    y:ps1[i].y,
                    z:ps1[i].z, 
                },def(op.ts1,{}));

                var p2 = p_ts({
                    x:ps2[i].x,
                    y:ps2[i].y,
                    z:ps2[i].z, 
                },def(op.ts2,{}));

                p.x += vj*p1.x+(1.-vj)*p2.x ;
                p.y += vj*p1.y+(1.-vj)*p2.y ;
                p.z += vj*p1.z+(1.-vj)*p2.z ; 
                
                
                return p_ts(p,def(op.ts,{}));
            }  
        });
        if(op.continue || j!=0)rim.Connect(geo,null,null,op.flip);
        }
    },
    nurbsSurface :  function (geo,rim,base,ref,ur,un,vr,vn,f){ 

        if(ur.length == 1){ ur.push(ur[0]); un = [0,1]; }
        if(vr.length == 1){ vr.push(vr[0]); vn = [0,1]; }
        if( (vn==null || vn.length ==0) && vr.length>1){
            vn = [];
            for(var v=0 ;v<1;v+=(1./(vr.length-1))){
                vn.push(v);
            }
            vn.push(1);
        }

        

        for(var i =0;i<base.length ;i++){  
            
            var v = 0;var ref1,ref2;
            for(var j =vn.length-1;j>0;j--){
                var v1 = i /base.length;
                if(v1 <= vn[j] ){
                    v = (v1 - vn[j-1])/(vn[j]-vn[j-1]);
                    ref1 = ref[vr[j-1]];
                    ref2 = ref[vr[j]];   
                }
            }  

        GB.rims.nurbsRim(geo,rim,ref,ur,un,ref1 , ref2 ,{v: v,index:i });
        rim.Connect(geo,null,null,f);
        } 
    } 
};

GB.models = {
    sample: function (setting, geo) {
        var rim = new GB.Rims();
        rim
            .PushSquare(geo, { sf: 'xz', w: 0, d: 0, y: 0.5 })
            .PushSquare(geo, { sf: 'xz', w: 1, d: 1, y: 0.5 }).Connect(geo)
            .PushSquare(geo, { sf: 'xz', w: 1, d: 1, y: 0.5 })
            .PushSquare(geo, { sf: 'xz', w: 1, d: 1, y: -0.5 }).Connect(geo)
            .PushSquare(geo, { sf: 'xz', w: 1, d: 1, y: -0.5 })
            .PushSquare(geo, { sf: 'xz', w: 0, d: 0, y: -0.5 }).Connect(geo);

    },
    cube: function (st, geo) {
        var rim = new GB.Rims();
        rim
            .PushSquare(geo, { sf: 'xz', w: 0, d: 0, x: st.x, z: st.z, y: st.d / 0.5 })
            .PushSquare(geo, { sf: 'xz', w: st.w, d: st.h, x: st.x, z: st.z, y: st.d / 0.5 }).Connect(geo)
            .PushSquare(geo, { sf: 'xz', w: st.w, d: st.h, x: st.x, z: st.z, y: st.d / 0.5 })
            .PushSquare(geo, { sf: 'xz', w: st.w, d: st.h, x: st.x, z: st.z, y: -st.d / 0.5 }).Connect(geo)
            .PushSquare(geo, { sf: 'xz', w: st.w, d: st.h, x: st.x, z: st.z, y: -st.d / 0.5 })
            .PushSquare(geo, { sf: 'xz', w: 0, d: 0, x: st.x, z: st.z, y: -st.d / 0.5 }).Connect(geo);

    },
    column: function (st, geo) {
        var rim = new GB.Rims();
        rim
            .PushCircle(geo, { s: st.s, sf: 'xy', w: st.w, d: st.h, x: st.x, y: st.y, z: st.d })
            .PushCircle(geo, { s: st.s, sf: 'xy', w: st.w, d: st.h, x: st.x, y: st.y, z: 0. }).Connect(geo);

    },
    lineBuilder: function (setting /*{seg:number}*/, geo) {

        var p;

        p = setting.pts[0];

        GB.MakeFace(geo,
            [
                { x: p.x + 0.0025, y: p.y, z: p.z - 0.0025 },
                { x: p.x - 0.0025, y: p.y, z: p.z - 0.0025 },
                { x: p.x + 0.0025, y: p.y, z: p.z + 0.0025 },
                { x: p.x - 0.0025, y: p.y, z: p.z + 0.0025 }
            ]
            , {
                flip: true,
                faceUVMap: "0123", 
            });
       GB.MakeFace(geo,
                [
                    { x: p.x , y: p.y+ 0.0025, z: p.z - 0.0025 },
                    { x: p.x , y: p.y- 0.0025, z: p.z - 0.0025 },
                    { x: p.x , y: p.y+ 0.0025, z: p.z + 0.0025 },
                    { x: p.x , y: p.y- 0.0025, z: p.z + 0.0025 }
                ]
                , {
                    flip: true,
                    faceUVMap: "0123", 
                });

        for (var i = 1; i <= setting.pts.length - 1; i++) {
            p = setting.pts[i];
            p.o = setting.pts[i - 1];
            if (!p.c) {
                GB.MakeFace(geo,
                    [
                        { x: p.x, y: p.y, z: p.z },
                        { x: p.x, y: p.y, z: p.z },
                        { x: p.o.x, y: p.o.y, z: p.o.z }
                    ]
                    , {
                        flip: true,
                        faceUVMap: "012",
                        Face3Point: true,
                    });

                GB.MakeFace(geo,
                    [
                        { x: p.x + 0.0015, y: p.y, z: p.z - 0.0015 },
                        { x: p.x - 0.0015, y: p.y, z: p.z - 0.0015 },
                        { x: p.x + 0.0015, y: p.y, z: p.z + 0.0015 },
                        { x: p.x - 0.0015, y: p.y, z: p.z + 0.0015 }
                    ]
                    , {
                        flip: true,
                        faceUVMap: "0123", 
                    });
            }
        }
    },
    sphare: function (option /*{seg:number}*/, geo) {


        var part_Sphare = new GB.Part()
            .Create(function (option, custom) {



                var setting = {};

                setting.s = (option.seg.valueOf() * 1);
                setting.radius = (option.radius.valueOf() * 1);

                var rim = new GB.Rims();

                for (var j = 0; j < setting.s; j++) {
                    rim.UV(function (p, i, n) {
                        return { u: 1. - j / n, v: i / n };
                    }).PushRim(geo, {
                        count: setting.s,
                        point: function (p, i) {
                            count = setting.s - 1;

                            p.x = sin(i * deg * 180. / count) * setting.radius;
                            p.y = cos(i * deg * 180. / count) * setting.radius;

                            p = r_y(p, j * 360. * deg / count);

                            return custom(p, option);
                        }
                    });

                    if (j > 0)
                        rim.Connect(geo, null, null, setting.flip);

                }



            }).Custom(function (p, op) {
                return p_ts(p, def(option.ts, {}));
            });


        part_Sphare.New(option);

    },
    faceXZ: function (setting, geo) {
        var rim = new GB.Rims().UV(function (p, i, s) { return { u: 0, v: i / s } }).PushRim(geo, GB.rims.line2P({
            p1: { x: setting.w * 0.5, y: 0, z: setting.h * 0.5 },
            p2: { x: -setting.w * 0.5, y: 0, z: setting.h * 0.5 }
        }))
            .UV(function (p, i, s) { return { u: 1, v: i / s } }).PushRim(geo, GB.rims.line2P({
                p1: { x: setting.w * 0.5, y: 0, z: -setting.h * 0.5 },
                p2: { x: -setting.w * 0.5, y: 0, z: -setting.h * 0.5 }
            })).Connect(geo, null, null, setting.flip);
    },
    faceXY: function (setting, geo) {
        var rim = new GB.Rims().UV(function (p, i, s) { return { u: 0, v: i / s } }).PushRim(geo, GB.rims.line2P({
            p1: { x: setting.w * 0.5, z: 0, y: setting.h * 0.5 },
            p2: { x: -setting.w * 0.5, z: 0, y: setting.h * 0.5 }
        }))
            .UV(function (p, i, s) { return { u: 1, v: i / s } }).PushRim(geo, GB.rims.line2P({
                p1: { x: setting.w * 0.5, z: 0, y: -setting.h * 0.5 },
                p2: { x: -setting.w * 0.5, z: 0, y: -setting.h * 0.5 }
            })).Connect(geo, null, null, setting.flip);
    },
    helper_surface_pow: function (setting /*{seg:number}*/, geo) {
        if (!geo) return {
            seg_segment_1_100: 20,
            size: 10,
            dx_arcx_bol: true,
            dz_arcz_bol: true,
            nx_arcnx_bol: true,
            nz_arcnz_bol: true,
            n_power: 1.0,
            l_level: 1.0
        };

        ind = 0;

        var size = setting.size;
        var rad = setting.rad;
        var rim = new GB.Rims();
        var cus = def(setting.cus, function (p, op) {

            var x = p.x;
            var z = p.z;
            if (setting.dz && z > 0) z = 0;
            if (setting.dx && x > 0) x = 0;
            if (setting.nz && z < 0) z = 0;
            if (setting.nx && x < 0) x = 0;

            var v = pow(pow(x / size) + pow(z / size), 1);

            p.y = Math.sign(v) * rad * pow(abs(v), def(setting.n, 1.)) * def(setting.l, 1.);

            p.y = max(-size * 0.5, p.y);

            return p;
        });


        for (var j = 0; j <= setting.seg; j++) {

            rim.UV(function (p, i, s) { return { u: i / setting.seg, v: j / setting.seg }; });
            rim.PushRim(geo, {
                count: setting.seg + 1,
                point: function (p, i) {
                    p.x = size * i / setting.seg - size * 0.5;
                    p.z = size * j / setting.seg - size * 0.5;
                    return cus(p);
                }
            });
            rim.Connect(geo);

        }

    },
    surface:function(setting,geo){ 

        ind  = 0;
        GB.rightHand = true; 
       
        var rim = new GB.Rims(); 

        for(var i=1;i<setting.curves.length;i++){
            GB.rims.surface(geo,rim,setting.curves[i-1],setting.curves[i],{seg:setting.seg,flip:setting.flip});
        } 

    },
    nurbs  : function(setting , geo){
        ind = 0;

        GB.rightHand = true;
        
        var rim = new GB.Rims();  
      
        GB.rims.nurbsSurface(geo,rim,setting.curves[setting.rows[0]],setting.curves,
            setting.rows,
            setting.rowsPercent ,
            setting.columns,
            setting.columnsPercent ,setting.flip); 
    }
};

GB.colorMats = [];
GB.line = function (scene, pts, co) {
    if (!GB.colorMats[co.r + '!' + co.g + '!' + co.b]) {
        GB.colorMats[co.r + '!' + co.g + '!' + co.b] =
            new BABYLONX.ShaderBuilder().Solid(co).Wired().BuildMaterial(scene);
    }
    var ms = r_mur.maker({ pts: pts }, GB.models.lineBuilder);
    ms.material = GB.colorMats[co.r + '!' + co.g + '!' + co.b];
    return ms;
};


GB.path3D = function (p1, ph1, p2, ph2, arc) {

    var ps = [];
    for (var i = (arc.start ? 0 : 1); i <= arc.seg - (arc.end ? 1 : 0); i++) {

        var v = i / (arc.seg);
        var ip = {
            x: p1.x * v + (1. - v) * p2.x,
            y: p1.y * v + (1. - v) * p2.y,
            z: p1.z * v + (1. - v) * p2.z,
        };

        var v2, v3;
        if (arc.mode && arc.mode == 'sin') {
            v2 = v * pow(sin(v * PI), def(arc.level, 1.));
            v3 = (1. - v) * pow(sin((1. - v) * PI), def(arc.level, 1.));
        } else {
            var v2 = v * pow(pow(1. - pow(v * 2 - 1, 2.0), 0.5), def(arc.level, 1.));
            var v3 = (1. - v) * pow(pow(1. - pow((1. - v) * 2 - 1, 2.0), 0.5), def(arc.level, 1.));
        }

        var p = {
            v: v, x: ip.x + ph1.x * v2 * def(arc.power, 1.) + ph2.x * v3 * def(arc.power, 1.),
            y: ip.y + ph1.y * v2 * def(arc.power, 1.) + ph2.y * v3 * def(arc.power, 1.),
            z: ip.z + ph1.z * v2 * def(arc.power, 1.) + ph2.z * v3 * def(arc.power, 1.)
        };

        if (arc.f) {
            try {
                p = arc.f(p, i  , norm(cln(p, null, ip)), norm({
                    x: p.x - (p1.x + p2.x) * 0.5,
                    y: p.y - (p1.y + p2.y) * 0.5,
                    z: p.z - (p1.z + p2.z) * 0.5
                }), arc.seg);
            } catch (e) { }
        }


        ps.push(p);

    }
    return ps;
};

GB.line_cach = [];

GB.dispose = function (mesh) {

    function getAllModel(mesh) {
        var m = [];

        if (mesh && mesh._children)
            for (var ms in mesh._children) {
                ms = mesh._children[ms];
                m.push(ms);
                m.concat(getAllModel(ms));
            }
        return m;
    }

    var m = getAllModel(mesh);
    for (var ms in m) {
        if (m[ms].dispose) {
            m[ms].parent = null;
            m[ms].dispose();
        }
    }

    if(mesh)
    mesh.dispose();
}

GB.drawPath3D2Point = function (scene, p, p1, op) {

    op = def(op, {});

    var p_1 = p.p1.position;
    if (p.p1.solid) {
        p_1 = { x: 0, y: 0, z: 0 }
    }

    var p_2 = p1.p2.position;

    if (p1.p2.solid) {
        p_2 = { x: 0, y: 0, z: 0 }
    }
    
    var f = null;
    if(p.func && p.func.replaceAll('\n','').replaceAll(' ','').length > 1 ){
         f = js(`function(p,i,a,b,n){ 
             if(i==0) return p;
             if(i==n) return p;
             var v = i/n;
             
             `+ (p.cnt?'c = '+p.cnt+';':'')+ (p.hgt?'h = '+p.hgt+';':'')+ p.func.replaceAll('\n','')+`

             return p;
         }`) ;               
    } 

    var ps = GB.path3D(p1.position, p_2, p.position, p_1,
        { f: f, seg: def(p.seg, 32), mode: def(op.mode, 'Z'), power: def(p.pow, 1), level: def(p.lvl, 1) });

    if (p.line) p.line.dispose();

    var ps_1 = [p.position];
    ps_1 = ps_1.concat(ps);

    p.line = GB.line(scene, ps_1, { r: 1., g: sin(p.position.x) * 0.5 + 0.5, b: sin(p.position.z) * 0.5 + 0.5 });
    p.line.isLine = true;

};

GB.updateConnect = function (scene, array, index) {

    if ((prevIndex(array, index) != undefined) && array[index])
        GB.drawPath3D2Point(scene, array[prevIndex(array, index)], array[index]);

    if (nextIndex(array, index) != undefined && array[index])
        GB.drawPath3D2Point(scene, array[index], array[nextIndex(array, index)]);
 

};

GB.faceCorrect = function(iden){
    for(var face in _faceModels){
        if(_faceModels[face] && _faceModels[face].visibility > 0 && 
             (_faceModels[face].rows && _faceModels[face].rows.indexOf(iden)!=-1) || 
             (_faceModels[face].cols && _faceModels[face].cols.indexOf(iden)!=-1)  ){

                if(_faceModels[face].nurbs) 
                  _nurbsHelper (face,1);
                else if(_faceModels[face].surface) 
                  _surfaceHelper(face,1);
             

        }
    }};