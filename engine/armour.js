var armour = function (canvas, camera) {
    this.canvas = canvas;
    this.camera = def(camera, this.camera);
}

armour.prototype = {
    scene: null,
    canvas: null,
    engine: null,

    maker: function (op, builder, mat, init) {

        var gb = new BABYLONX.Geometry(GB.GeometryBase(op, builder, op.custom)).toMesh(this.scene);

        gb.material = new BABYLONX.ShaderBuilder()

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
            }).BuildMaterial(this.scene);

        if (init) init(gb, gb.material);

        return gb;
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

          


            if (event.keyCode == 87) scene.KeyW = 1;
            if (event.keyCode == 83) scene.KeyS = 1;
            if (event.keyCode == 65) scene.KeyA = 1;
            if (event.keyCode == 68) scene.KeyD = 1;
            if (event.keyCode == 81) scene.KeyQ = 1;
            if (event.keyCode == 69) scene.KeyE = 1;

            if (event.keyCode == 90) scene.KeyZ = 1;


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

            if (event.keyCode == 87) scene.KeyW = 0;
            if (event.keyCode == 83) scene.KeyS = 0;
            if (event.keyCode == 65) scene.KeyA = 0;
            if (event.keyCode == 68) scene.KeyD = 0;
            if (event.keyCode == 81) scene.KeyQ = 0;
            if (event.keyCode == 69) scene.KeyE = 0;
            if (event.keyCode == 38) scene.KeyUp = 0;
            if (event.keyCode == 90) scene.KeyZ = 0;
            
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
};

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

};
GB.models = {
    sample: function (setting, geo) {
        var rim = new GB.Rims();
        rim
            .PushSquare(geo, { sf: 'xz', w: 0, l: 0, y: 0.5 })
            .PushSquare(geo, { sf: 'xz', w: 1, l: 1, y: 0.5 }).Connect(geo)
            .PushSquare(geo, { sf: 'xz', w: 1, l: 1, y: 0.5 })
            .PushSquare(geo, { sf: 'xz', w: 1, l: 1, y: -0.5 }).Connect(geo)
            .PushSquare(geo, { sf: 'xz', w: 1, l: 1, y: -0.5 })
            .PushSquare(geo, { sf: 'xz', w: 0, l: 0, y: -0.5 }).Connect(geo);

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
    helper_surface_pow : function (setting /*{seg:number}*/, geo) {
        if(!geo) return {
            seg_segment_1_100:20,
            size:10,
            dx_arcx_bol:true,
            dz_arcz_bol:true,
            nx_arcnx_bol:true,
            nz_arcnz_bol:true,
            n_power:1.0,
            l_level:1.0 
        };

        ind = 0;
        
        var size = setting.size; 
        var rad = setting.rad; 
        var rim = new GB.Rims();
        var cus = def(setting.cus,function(p,op){
    
            var x = p.x;
            var z = p.z;
            if(setting.dz && z >0 ) z = 0; 
            if(setting.dx && x >0) x = 0; 
            if(setting.nz && z <0) z = 0; 
            if(setting.nx && x <0) x = 0; 
    
              var v =  pow(pow( x/size)+pow( z/ size),1) ;
    
              p.y = Math.sign(v)*rad*pow(abs(v),def(setting.n,1.))*def(setting.l,1.);
    
              p.y = max(-size*0.5,p.y);
    
             return p;
         });
    
    
        for(var j=0;j<=setting.seg;j++){
    
            rim.UV(function(p,i,s){ return {u:i/setting.seg,v:j/setting.seg};});
            rim.PushRim(geo,{
                count:setting.seg+1,
                point:function(p ,i){
                    p.x =  size*i/setting.seg- size*0.5;
                    p.z =  size*j/setting.seg- size*0.5;
                    return cus(p);
                }
            });
            rim.Connect(geo);
    
        }
    
    }
};