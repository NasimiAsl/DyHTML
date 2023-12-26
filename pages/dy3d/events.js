local = {
    prepare: function (eng, setting) { 
         

        eng.initCamera = function (scene, setting) {

            // This creates and positions a free camera (non-mesh)
            var camera = new BABYLON.ArcRotateCamera("camera1", 3, 3, 3, new BABYLON.Vector3(0, 5, -10), scene);

            // This targets the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero());

            camera.minZ = 0.01;
            camera.maxZ = 1000.;

            camera.lowerRadiusLimit = 0.05;
            camera.upperRadiusLimit = 100.;


            return camera;
        };

        eng.keyFrame = function (time) {

            if (time % 100 < 1) {
                var width = eng.canvas.offsetWidth;
                var height = eng.canvas.offsetHight;
                if (eng.width != width || eng.hieght != height) {
                    eng.width = width;
                    eng.hieght = height;
                    eng.engine.resize();
                }
            }

        };


        return setting;
    },
    applyEvent: function (eng, scene) {

        var th = this;


        var clickDown = {};

        scene.onPointerDown = function (d, p) {

            clickDown.x = event.offsetX;
            clickDown.y = event.offsetY;
            clickDown.d = 1;
            clickDown.t = new Date().getTime();
            clickDown.b = event.button;

            if (!eng.scene.KeyCtrl && !eng.scene.KeyShift && !eng.scene.KeyAlt &&
                clickDown.d && clickDown.b == 0) {

                clickDown.camRotation = 1;
                th.cameraRotation(eng, clickDown.dx, clickDown.dy, true);
            }

            if (!eng.scene.KeyCtrl && !eng.scene.KeyShift && !eng.scene.KeyAlt &&
                clickDown.d && clickDown.b == 2) {

                clickDown.camMovement = 1;
                th.cameraMovement(eng, clickDown.dx, clickDown.dy, true);
            }

            if (p.hit) {

                if (eng.scene.KeyCtrl   && !eng.scene.KeyAlt &&
                    clickDown.d && clickDown.b == 2   ) {

                    clickDown.objMovement = p.pickedMesh;  

                    clickDown.objMovement.ocmd = th.rollCalc('ts',clickDown.objMovement,{});

                    th.objMovement(eng, clickDown.objMovement, clickDown.dx, clickDown.dy, true);
                }
            } 

        };

        scene.onPointerMove = function (d, p) {

            clickDown.dx = event.offsetX - clickDown.x;
            clickDown.dy = event.offsetY - clickDown.y;
            clickDown.mx = event.offsetX;
            clickDown.my = event.offsetY;
            clickDown.dt = new Date().getTime() - clickDown.t;

            clickDown.m = 1;

            if (clickDown.camRotation)
                th.cameraRotation(eng, clickDown.dx, clickDown.dy);

            if (clickDown.camMovement)
                th.cameraMovement(eng, clickDown.dx, clickDown.dy);

            if (clickDown.objMovement)
                th.objMovement(eng, clickDown.objMovement, clickDown.dx, clickDown.dy,null, eng.scene.KeyShift);

        };

        scene.onPointerUp = function (d, p) {

            clickDown.b = null;

            clickDown.d = 0;
            clickDown.m = 0;


            if(clickDown.objMovement){
                th.roll('ts',clickDown.objMovement,{},clickDown.objMovement.ocmd);
            }
             
           clickDown.objMovement = null; 

            clickDown.camRotation = 0;
            clickDown.camMovement = 0;
            

        };

        document.body.addEventListener('keyup', 
        function(event){

            if(scene.KeyZ && scene.KeyCtrl && !scene.KeyShift){
                
                th.undo();
            } else  if(scene.KeyZ && scene.KeyCtrl && scene.KeyShift){
                th.redo();
            }

            __log(event.keyCode);

            scene.keyU(event)
        });
        document.body.addEventListener('keydown', scene.keyD);
        document.body.addEventListener('wheel', function () {

        });

    },
    rollList :[],
    rollActivePos : 0,
    rollCalc:function(type,obj,cmd){
        cmd.type = type;
        cmd.model = obj; 
        switch( type){
            case 'ts':{
                
               cmd.mx = cmd.model.position.x  ;
               cmd.my = cmd.model.position.y ;
               cmd.mz = cmd.model.position.z ;
               cmd.rx = cmd.model.rotation.x ;
               cmd.ry = cmd.model.position.y ;
               cmd.rz = cmd.model.position.z ;
               cmd.sx = cmd.model.scaling.sx ;
               cmd.sy = cmd.model.scaling.sy ;
               cmd.sz = cmd.model.scaling.sz ; 
                break;
            }
            case 'del':{
                cmd.visibility = cmd.model.visibility  ;
                cmd.model.isDeleted = true;                  
                break;
            }
        }  

        return cmd;
        
    },
    roll:function(type,obj,cmd,ocmd){ 

        cmd = this.rollCalc(type,obj,cmd);
        cmd.ocmd = ocmd;

        this.rollActivePos++;
        this.rollList[ this.rollActivePos] = cmd;  
        
    },
    undo:function(){ 

        if(!this.rollList[this.rollActivePos  ]) return;  
        
        this.rollBack(this.rollList[  this.rollActivePos-- ].ocmd);
        if( this.rollActivePos<0)  this.rollActivePos = 0;
    }, 
    redo:function(){
        if(!this.rollList[this.rollActivePos+1]) return;
         
        this.rollBack(this.rollList[++this.rollActivePos]);
    },
    rollBack:function(cmd){

       

        switch(cmd.type){
            case 'ts':{

                cmd.model.position.x = cmd.mx;
                cmd.model.position.y = cmd.my;
                cmd.model.position.z = cmd.mz;
                cmd.model.rotation.x = cmd.rx;
                cmd.model.position.y = cmd.ry;
                cmd.model.position.z = cmd.rz;
                cmd.model.scaling.x = def(cmd.sx,1);
                cmd.model.scaling.y = def(cmd.sy,1);
                cmd.model.scaling.z = def(cmd.sz,1);
                break;
            }
            case 'del':{
                cmd.model.visibility = cmd.visibility;
                cmd.model.isDeleted = false;                  
                break;
            }
        } 
    }

}
 