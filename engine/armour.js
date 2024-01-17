var armour = function (canvas, camera) {
    this.canvas = canvas;
    this.camera = def(camera, this.camera);
}

armour.prototype = {
    ik :1,
    scene: null,
    canvas: null,
    engine: null,
    shader: function (mat, scene) {
        return new BABYLONX.ShaderBuilder()

            .Func(function (me) {
                me.Setting.FragmentWorld = true;
                me.Setting.VertexWorld = true;
                me.Setting.Look = true;

                me = me.InLine(`

    vec3 wps = vec4(world*vec4(pos,1.)).xyz;
    vec3 wnm = mat3(world)*nrm;
    float wfs =dot(wnm, normalize(camera-wps));
    float wfs2 = pow(  wfs*0.5,3. )*2.0;  

        
    `);
                if (mat)
                    return mat(me);
                return me;
            }).BuildMaterial(scene);
    },
    reflect: function(ref,nrm,brk,x,y,z,bias){
        armour.prototype.ik++;
         var ik = armour.prototype.ik;
        return 'vec3 new_nrm'+ik+' = '+nrm+';\
                vec3 vr'+ik+' = normalize( reflect(new_nrm'+ik+',  normalize(camera - wps )) ); \
                vr'+ik+'.x =   floor( vr'+ik+'.x*100000.)/100000.; \
                vr'+ik+'.y =   floor( vr'+ik+'.y*100000.)/100000.; \
                vr'+ik+'.z =   floor( vr'+ik+'.z*100000.)/100000.; \
                \
                float y'+ik+'= .5+  - atan( float('+z+')*vr'+ik+'.z,     float('+x+')*vr'+ik+'.x ) / (2.*3.141592);\
                float p'+ik+'= 0.5  - atan(  float('+y+')*vr'+ik+'.y, float('+brk+')+ length( vr'+ik+'.xz ) ) / ( 3.141592);\
                y'+ik+' =   floor( y'+ik+'*100000.)/100000.; \
                p'+ik+' = floor( p'+ik+'*100000.)/100000.; \
                result = texture2DLodEXT( txtRef_'+ref+', vec2( y'+ik+', p'+ik+') ,float('+bias+'));\
             ';
    },

    maker: function (op, builder, mat, init) {

        var gb = new BABYLONX.Geometry(GB.GeometryBase(op, builder, op.custom)).toMesh(this.scene);

        if (mat)
            gb.material = armour.prototype.shader(mat, this.scene);

        if (init) init(gb, gb.material);

        return gb;
    },
    view3D: function (eng, pos, tag) {
        if (pos)
            eng.camera.position = BABYLON.Vector3(pos.x, pos.y, pos.z);

        if (tag)
            eng.camera.setTarget(BABYLON.Vector3(eng.camera.position.x + def(tag.x, 0),
                eng.camera.position.y + def(tag.y, 0),
                eng.camera.position.z + def(tag.z, 0)));

    },
    viewAngle: function (eng, pos, animated) {


        if (animated) {

        }
        else {

            if (pos.x || pos.y || pos.z) {
                eng.camera.setTarget(BABYLON.Vector3(def(pos.x, eng.camera._currentTarget.x),
                    eng.camera.position.y + def(pos.y, eng.camera._currentTarget.y),
                    eng.camera.position.z + def(pos.z, eng.camera._currentTarget.z)));
            }
            if (pos.a != undefined) eng.camera.alpha = pos.a;
            if (pos.b != undefined) eng.camera.beta = pos.b;
            if (pos.r != undefined) eng.camera.radius = pos.r;
            if (pos.f != undefined) eng.camera.fov = pos.f;
            if (pos.mn != undefined) eng.camera.minZ = pos.mn;
            if (pos.mx != undefined) eng.camera.maxZ = pos.mx;
        }
    },
    initCamera: function (scene, setting) {
        var scene = this.scene;
        // This creates and positions a free camera (non-mesh)
        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, 0), scene);
        return camera;
    },
    create: function (setting) {

        var th = this;

        BABYLONX.ShaderBuilder.InitializeEngine();
        BABYLONX.GeometryBuilder.InitializeEngine();

        // This creates a basic Babylon Scene object (non-mesh)

        this.engine = new BABYLON.Engine(this.canvas, true, { preserveDrawingBuffer: true });

        this.scene = new BABYLON.Scene(this.engine);

        var scene = this.scene;

        var time = 0;

        scene.keys = "";
        scene.keyD = function (event) {
            var k = ',' + event.keyCode + ',';
            scene.keys = scene.keys.replaceAll(k, '') + k;
            //scene.alpha_view = scene.activeCamera.alpha;

            scene.KeyShift = event.shiftKey;
            scene.KeyAlt = event.altKey;
            scene.KeyCtrl = event.ctrlKey;


            if (event.keyCode == 112) scene.KeyF1 = 1;
            if (event.keyCode == 113) scene.KeyF2 = 1;
            if (event.keyCode == 114) scene.KeyF3 = 1;
            if (event.keyCode == 115) scene.KeyF4 = 1;




            if (event.keyCode == 87) scene.KeyW = 1;
            if (event.keyCode == 83) scene.KeyS = 1;
            if (event.keyCode == 65) scene.KeyA = 1;
            if (event.keyCode == 68) scene.KeyD = 1;
            if (event.keyCode == 81) scene.KeyQ = 1;
            if (event.keyCode == 69) scene.KeyE = 1;

            if (event.keyCode == 90) scene.KeyZ = 1;

            if (event.keyCode == 46) scene.KeyDelete = 1;
            if (event.keyCode == 8) scene.KeyBackspace = 1;

            if (event.keyCode == 38) scene.KeyUp = 1;
            if (event.keyCode == 40) scene.KeyDown = 1;
            if (event.keyCode == 37) scene.KeyLeft = 1;
            if (event.keyCode == 39) scene.KeyRight = 1;
            if (event.keyCode == 32) scene.KeySpace = 1;
            if (event.keyCode == 13) scene.KeyEnter = 1;
            if (event.keyCode == 82) scene.KeyR = 1;
            if (event.keyCode == 84) scene.KeyT = 1;

        }

        scene.keyU = function (event) {
            var k = ',' + event.keyCode + ',';
            scene.keys = scene.keys.replaceAll(k, '');

            scene.KeyShift = false;
            scene.KeyAlt = false;
            scene.KeyCtrl = false;


            scene.key = event.key;

            if (event.keyCode == 112) scene.KeyF1 = 0;
            if (event.keyCode == 113) scene.KeyF2 = 0;
            if (event.keyCode == 114) scene.KeyF3 = 0;
            if (event.keyCode == 115) scene.KeyF4 = 0;


            if (event.keyCode == 87) scene.KeyW = 0;
            if (event.keyCode == 83) scene.KeyS = 0;
            if (event.keyCode == 65) scene.KeyA = 0;
            if (event.keyCode == 68) scene.KeyD = 0;
            if (event.keyCode == 81) scene.KeyQ = 0;
            if (event.keyCode == 69) scene.KeyE = 0;
            if (event.keyCode == 38) scene.KeyUp = 0;

            if (event.keyCode == 90) scene.KeyZ = 0;

            if (event.keyCode == 46) scene.KeyDelete = 0;
            if (event.keyCode == 8) scene.KeyBackspace = 0;


            if (event.keyCode == 40) scene.KeyDown = 0;
            if (event.keyCode == 37) scene.KeyLeft = 0;
            if (event.keyCode == 39) scene.KeyRight = 0;
            if (event.keyCode == 32) scene.KeySpace = 0;
            if (event.keyCode == 13) scene.KeyEnter = 0;
            if (event.keyCode == 82) scene.KeyR = 0;
            if (event.keyCode == 84) scene.KeyT = 0;

        }


        scene.clearColor = new BABYLON.Color4(def(setting.color.x, 0), def(setting.color.y, 0), def(setting.color.z, 0), def(setting.color.w, 1));

        this.camera = this.initCamera(scene, setting);

        keyCodeCheck = 0;
        kyCheck = function (ks) {
            if (keyCodeCheck) return 0;
            var f = 1;
            for (var i in ks) {
                if (scene.keys.indexOf(',' + ks[i] + ',') == -1) {
                    f = 0;
                }
            }
            if (f == 1) {
                keyCodeCheck = 1;
                setTimeout(() => {
                    keyCodeCheck = 0;
                }, 300);
            }
            return f;
        }

        scene.time = 0;


        scene.registerBeforeRender(function () {

            scene.time++;

            if (scene.frame) scene.frame(scene.time);


            new BABYLONX.ShaderMaterialHelper().SetUniforms(
                scene.meshes,
                scene.activeCamera.position,
                scene.activeCamera._currentTarget,
                { x: 0, y: 0 },
                { x: 100, y: 100 },
                scene.time);

        });

        this.engine.runRenderLoop(function () {

            if (th.keyFrame) th.keyFrame(scene.time);

            if (!scene.pause)
                scene.render();
        }); 

        return scene;
    }

    ,
    curve: {
        addPoint:  function (main3D, p, iden, index,f) {
             
                if (!main3D.point_h) {
                    main3D.point_h = main3D.maker({ seg: 10, radius: 0.01 }, GB.models.sphare, function (me) {
                        me.Solid({ r: 1, g: 0.8, b: 0.3 })
                            .Event(2, 'result.xyz = vec3(1.,0.5,0.);')
                            .Event(3, 'result.xyz = vec3(1.,1.0,0.);')

                            ; return me
                    });
                    main3D.point_h.visibility = 0;
                    main3D.point_h.isPickable = 0;
                }

                if (!main3D.point_t) {
                    main3D.point_t = main3D.maker({ seg: 10, radius: 0.008 }, GB.models.sphare, function (me) {
                        me.Solid({ r: .7, g: .7, b: .5 })
                            .Event(2, 'result.xyz = vec3(1.,0.5,0.);')
                            .Event(3, 'result.xyz = vec3(1.,1.0,0.);')

                            ; return me
                    });

                    main3D.point_t.visibility = 0;
                    main3D.point_t.isPickable = 0;

                    main3D.point_t2 = main3D.maker({ seg: 10, radius: 0.008 }, GB.models.sphare, function (me) {
                        me.Solid({ r: .5, g: .7, b: .7 })
                            .Event(2, 'result.xyz = vec3(1.,0.5,0.);')
                            .Event(3, 'result.xyz = vec3(1.,1.0,0.);')

                            ; return me
                    });

                    main3D.point_t2.visibility = 0;
                    main3D.point_t2.isPickable = 0;

                    main3D.point_l = main3D.maker({ s: 10, d: 1, w: 0.0015, h: 0.0015, x: 0., y: 0., z: 1.0 }, GB.models.column, function (me) {
                        me.Solid({ r: 1, g: 1, b: 1, a: 0.2 })
                            .Transparency()
                            ; return me
                    });

                    main3D.point_l.visibility = 0;
                    main3D.point_l.isPickable = 0;

                }



                var model = main3D.point_h.clone();
                model.visibility = 1;
                model.isPickable = 1;
                model.dragable = 1;
                model.isPoint = 1;

                model.p1 = main3D.point_t.clone();
                model.p1_line = main3D.point_l.clone();
                model.p2 = main3D.point_t2.clone();
                model.p2_line = main3D.point_l.clone();

                model.p1.isPoint = 1;
                model.p2.isPoint = 1;

                model.p1.left = 1;
                model.p1.isSub = 1;
                model.p2.right = 1;
                model.p2.isSub = 1;

                model.updateLines = function (model) {
                    var p1 = {
                        x: model.p1.position.x,
                        y: model.p1.position.y,
                        z: model.p1.position.z
                    };
                    var lp1 = pow(pow(p1.x) + pow(p1.y) + pow(p1.z), 0.5);
                    model.p1_line.scaling.z = lp1;

                    var p2 = {
                        x: model.p2.position.x,
                        y: model.p2.position.y,
                        z: model.p2.position.z
                    };
                    var lp2 = pow(pow(p2.x) + pow(p2.y) + pow(p2.z), 0.5);
                    model.p2_line.scaling.z = lp2;

                    model.p1_line.lookAt(model.p1.position);
                    model.p2_line.lookAt(model.p2.position);
                };

                model.p1.visibility = 1;
                model.p1_line.visibility = 1;
                model.p1.isPickable = 1;
                model.p1.dragable = 1;
                model.p1.position.x = .015;
                model.p1.solid = true;

                model.p2.visibility = 1;
                model.p2_line.visibility = 1;
                model.p2.isPickable = 1;
                model.p2.dragable = 1;
                model.p2.position.x = 0.015;
                model.p2.position.z = 0.005;
                model.p2.solid = true;

                model.p1.parent = model;
                model.p2.parent = model;
                model.p1_line.parent = model;
                model.p2_line.parent = model;

                model.position.x = p.pickedPoint.x;
                model.position.y = p.pickedPoint.y;
                model.position.z = p.pickedPoint.z;

                model.seg = p.seg;
                model.pow = p.pow;
                model.lvl = p.lvl; 
                model.func = p.func; 
                model.hgt = p.hgt; 
                model.cnt = p.cnt;  
                

                if(p.p1){
                   
                    model.p1.position.x = p.p1.x;
                    model.p1.position.y = p.p1.y;
                    model.p1.position.z = p.p1.z; 
                    model.p1.solid = false;
                }

                if(p.p2){
                    model.p2.position.x = p.p2.x;
                    model.p2.position.y = p.p2.y;
                    model.p2.position.z = p.p2.z; 
                    model.p2.solid = false;
                }
 

                model.updateLines(model);


                model.index = index;
                model.iden = iden;

                if(f){f(model);}  

                return model;

        },
       
        addPointAsync : async function(main3D, p, iden, index,f){
            return new Promise((resolve) => {
                resolve(r_mur.curve.addPoint(main3D, p, iden, index,f));
            });
        },
      
    

        getPoints:  function (main3D,struct ) {
            return new Promise((resolve) => {
                var d_t = new Date().getTime();
                var dt = []; 

                var lst_model = {
                    x: struct.start.p.x,
                    y: struct.start.p.y,
                    z: struct.start.p.z                       
                }; 
                
                
                dt.push(r_mur.curve.addPoint(main3D,{ 

                    pickedPoint : {
                        x: struct.start.p.x,
                        y: struct.start.p.y,
                        z: struct.start.p.z                       
                    },
                    seg:struct.start.seg,
                    pow:struct.start.pow,
                    lvl:struct.start.lvl,
                    func:struct.start.func,
                    hgt:struct.start.hgt,
                    cnt:struct.start.cnt, 
                    
                    p1:!struct.start.p1 ?null: {x:struct.start.p1.x,y:struct.start.p1.y,z:struct.start.p1.z},
                    p2:!struct.start.p2 ?null:{x:struct.start.p2.x,y:struct.start.p2.y,z:struct.start.p2.z},
                     
                 },struct.iden.valueOf()*1, struct.start.index ));
 

                for(var i in struct.data){  
                                        

                    i = struct.data[i];  

                      lst_model =  {
                        x: lst_model.x+i.dir.x*i.len ,
                        y: lst_model.y+i.dir.y*i.len ,
                        z: lst_model.z+i.dir.z*i.len   };  
 
                     

                      dt.push( r_mur.curve.addPoint(main3D,{ 

                        pickedPoint : {
                            x:  lst_model.x,
                            y:  lst_model.y,
                            z:  lst_model.z       
                        },

                        seg:i.seg,
                        pow:i.pow,
                        lvl:i.lvl,
                        func:i.func,
                        hgt:i.hgt,
                        cnt:i.cnt,

                        p1:!i.p1 ?null: {x:i.p1.x,y:i.p1.y,z:i.p1.z},
                        p2:!i.p2 ?null:{x:i.p2.x,y:i.p2.y,z:i.p2.z},
                         
                     },struct.iden.valueOf()*1, i.index )) ;

                }

                resolve(dt);
            });
        },  
        strToPoints :  function ( struct ,close,reverse,dup  ) { 
            var d_t = new Date().getTime();
            var dt = []; 

            var lst_model = {
                x: struct.start.p.x,
                y: struct.start.p.y,
                z: struct.start.p.z                       
            }; 
            
            
            dt.push({ 
                 seg:struct.start.seg,
                    pow:struct.start.pow,
                    lvl:struct.start.lvl,   
                p : {
                    x: struct.start.p.x,
                    y: struct.start.p.y,
                    z: struct.start.p.z  
                }, 
                func:struct.start.func,
                cnt:struct.start.cnt,
                hgt:struct.start.hgt,
                p1:!struct.start.p1 ?null: {x:struct.start.p1.x,y:struct.start.p1.y,z:struct.start.p1.z},
                p2:!struct.start.p2 ?null:{x:struct.start.p2.x,y:struct.start.p2.y,z:struct.start.p2.z} 
             }); 

            for(var i in struct.data){   

                i = struct.data[i];  

                  lst_model =  {
                    x: lst_model.x+i.dir.x*i.len ,
                    y: lst_model.y+i.dir.y*i.len ,
                    z: lst_model.z+i.dir.z*i.len   };  

                  dt.push({ 
                      seg:i.seg,
                     pow:i.pow,
                     lvl:i.lvl,  
                     func:i.func,  
                     cnt:i.cnt,  
                     hgt:i.hgt,  
                    p : {
                        x:  lst_model.x,
                        y:  lst_model.y,
                        z:  lst_model.z   
                    }, 
                    p1:!i.p1 ?null: {x:i.p1.x,y:i.p1.y,z:i.p1.z},
                    p2:!i.p2 ?null:{x:i.p2.x,y:i.p2.y,z:i.p2.z}, 
                 }) ; 
            }  

            var psii =   [dt[0].p]; 

            for(var i = 1;i<dt.length ;i++ ){ 

               if(!dt[i-1].p1) dt[i-1].p1 = {x:0,y:0,z:0};
               if(!dt[i ].p2) dt[i ].p2 = {x:0,y:0,z:0}; 

               var f = null;
               if(dt[i-1].func && dt[i-1].func.replaceAll('\n','').replaceAll(' ','').length > 1 ){
                    f = js(`function(p,i,a,b,n){ 
                        if(i==0) return p;
                        if(i==n) return p;
                        var v = i/n;
                        
                        `+  (dt[i-1].cnt?'c = '+dt[i-1].cnt+';':'')+ (dt[i-1].hgt?'h = '+dt[i-1].hgt+';':'')+dt[i-1].func.replaceAll('\n','')+`

                        return p;
                    }`) ;               
               } 
               var res = GB.path3D(dt[i ].p,dt[i ].p2,dt[i-1].p ,dt[i-1].p1,
                    { seg:def(dt[i-1].seg,32),power:def(dt[i-1].pow,1),level:def(dt[i-1].lvl,1),f:f});

               // psii = psii.concat(dt[i-1].p); 
               psii = psii.concat(res);  
            }   

            if(close)psii.push(dt[0].p);
            
            if(dup){
                var psij = [];
                for(var i in psii){
                    psij.push(psii[i]);
                    psij.push(psii[i]); 
                }
                psii = psij;                
            }

            if(reverse){
                psii = psii.reverse();
            } 

            return psii; 
        } ,
        hideHelperPoints:function(main3D){
            for (var ms in main3D.scene.meshes) {
                ms = main3D.scene.meshes[ms];
                if (ms.isPoint) {
                    ms.visibility = 0;
                    if (ms.p1_line) ms.p1_line.visibility = 0;
                    if (ms.p2_line) ms.p2_line.visibility = 0; 
                }
            }
        }  ,

        showHelperPoints:function(main3D,iden){
            for (var ms in main3D.scene.meshes) {
                ms = main3D.scene.meshes[ms];
                if ((ms.isPoint && ms.iden == iden) ||
                    (ms.isPoint && ms.isSub && ms.parent.iden == iden)
                ) {
                    if (ms.p1_line) ms.p1_line.visibility = 1;
                    if (ms.p2_line) ms.p2_line.visibility = 1;

                    ms.visibility = 1;
                }
            }
        } ,

        toStruct: async function (model,iden) {
            return new Promise((resolve) => {
                var d_t = new Date().getTime();

                var dt = {iden:iden, start: {}, data: [] };

                var idn = null;  

                for (var i in model) { 
                 

                        if (idn == null) {
                            dt.start = { 
                                index: i,
                                seg:model[i].seg,
                                pow:model[i].pow,
                                lvl:model[i].lvl, 
                                func:model[i].func, 
                                cnt:model[i].cnt, 
                                hgt:model[i].hgt, 
                                p: {
                                    x: model[i].position.x,
                                    y: model[i].position.y,
                                    z: model[i].position.z
                                },
                                p1:model[i].p1.solid?null:{
                                    x: model[i].p1.position.x,
                                    y: model[i].p1.position.y,
                                    z: model[i].p1.position.z
                                },
                                p2: model[i].p2.solid?null:{
                                    x: model[i].p2.position.x,
                                    y: model[i].p2.position.y,
                                    z: model[i].p2.position.z
                                }
                            };
                            idn = 0;
                        }
                        else {

                            var prv = prevIndex(model, i);

                            p = model[i].position;
                            p1 = model[prv].position;


                            var len = sqrt(pow(p.x - p1.x) + pow(p.y - p1.y) + pow(p.z - p1.z));

                            var dir = len == 0 ? { x: 0, y: 0, z: 0 } : {
                                x: (p.x - p1.x) / len,
                                y: (p.y - p1.y) / len,
                                z: (p.z - p1.z) / len
                            };

                            dt.data[idn] = {
                                index: i,
                                len: len,
                                dir: dir,

                                seg: model[i].seg,
                                pow: model[i].pow,
                                lvl: model[i].lvl,
                                func:model[i].func,
                                hgt:model[i].hgt,
                                cnt:model[i].cnt,
                                p1: model[i].p1.solid?null:{
                                    x: model[i].p1.position.x,
                                    y: model[i].p1.position.y,
                                    z: model[i].p1.position.z
                                },
                                p2: model[i].p2.solid?null:{
                                    x: model[i].p2.position.x,
                                    y: model[i].p2.position.y,
                                    z: model[i].p2.position.z
                                }
                            };

                            idn++;
                        }

                    
                }

                dt.prpTime = (new Date().getTime() - d_t); 

                resolve(dt);
            });
        }
    } 
    
};

var r_mur = armour.prototype;

