window.__log = function (m, c) { first('#log').innerHTML = m; };
local = {
   
    nurbsCall : function (eng,ref,_rims  ) {
        if (ref.model) ref.model.dispose();

        var rows = js(ref.rows);
        var cols = js(ref.cols);
        var rowsp = js(ref.rowsp);
        var colsp = js(ref.colsp);

        if (rows && rows.length > 0 && cols && cols.length > 0) {

            var refs = [];
            for (var i in rows) {
                refs[rows[i]] = r_mur.curve.strToPoints(_rims[rows[i]].str,_rims[rows[i]].clr 
                ,_rims[rows[i]].rvs, _rims[rows[i]].sld);
            }
            for (var i in cols) {
                refs[cols[i]] = r_mur.curve.strToPoints(_rims[cols[i]].str,_rims[cols[i]].clr 
                ,_rims[cols[i]].rvs,_rims[cols[i]].sld);
            }

            ref.model  = eng.maker({
                curves: refs,
                rows: rows,
                rowsPercent: rowsp,
                columns: cols,
                columnsPercent: colsp,
                flip: ref.flip
            },

                GB.models.nurbs, function (me) {

                    me = eng.scene.pbrMaterial(me,{ 
                        

                    });
                  
                    return me
                });

                ref.model.rows = rows;
                ref.model.cols = cols;
                ref.model.nurbs = true;
            return ref.model;

        }
    } ,
    surfaceCall : function  (main3D,ref,_rims  ) {
        if (ref.model) ref.model.dispose();

        var crvs = js(ref.curves); 

            var refs = [];
            for (var i in crvs) {
                refs.push(r_mur.curve.strToPoints(_rims[crvs[i]].str ,_rims[crvs[i]].clr 
                ,_rims[crvs[i]].rvs ,  _rims[crvs[i]].sld  ));
            } 

           ref.model = main3D.maker({ curves: refs, seg: 5, flip: ref.flip }, GB.models.surface, function (me) {
                    me.Solid({ r: Math.random() * 0.5, g: Math.random() * 0.5, b: Math.random() * 0.5 })
                        .InLine(`
                    float dt =1.- dot(wnm,normalize(camera-wps));
                    float dl = 1.-dot(wnm,normalize(vec3(1000.)-wps));

                    result = vec4( vec3(   result.xyz*0.5 +dl*0.25*vec3(1.)+dt*0.5+0.5*dt*result.xyz),1.  );
                        
                    
                    `).Func(function (mt) {
                            if (location.hash && location.hash.indexOf('!wired') != -1)
                                mt = mt.Wired();
                            return mt;
                        });
                    return me
                });

                ref.model.rows = crvs;
                ref.model.surface = true;

         return  ref.model; 
    } , 

    init: function (eng) { 



        eng.applyMaterial = function(eng,parts,op){

            console.log(parts);

            eng.lastActiveParts = def( parts,eng.lastActiveParts);
           
            if(parts == null) parts = eng.lastActiveParts;

            var cop = op;
            if(cop.color && cop.color.indexOf('#')==0)
            cop.color = hexToRgb(cop.color);  

            

            for(var i in eng.scene.parts){ 

             

                if(parts.indexOf(i)!=-1 || parts.indexOf('all')!=-1){ 

              
                for(var j in eng.scene.parts[i]){
 

                    eng.scene.parts[i][j].op = def(eng.scene.parts[i][j].op,{});


                    for(var o in cop){  
                        eng.scene.parts[i][j].op[o] = cop[o]; 
                    }  
                 
                   
                    eng.scene.parts[i][j].material = r_mur.shader(function(m){
                        return eng.scene.pbrMaterial(m,eng.scene.parts[i][j].op);});
                }
               }
            }

        };

        eng.scene.pbrMaterial  = function(me,op){

            op.path = op.path != undefined?op.path:'/images/textures/fabric_50.jpg';
            op.bump = op.bump != undefined?op.bump:0;
            op.uvs = op.uvs != undefined?op.uvs:1;
            op.uvr = op.uvr != undefined?op.uvr:0;
            op.bios = op.bios != undefined?op.bios:0;
            op.phonge = op.phonge != undefined?op.phonge:0;
            op.metal = op.metal != undefined?op.metal:0; 
            op.spec = op.spec != undefined?op.spec:0; 
            op.sppow = op.sppow != undefined?op.sppow:1; 
 

            me.Solid({ 
                r: op.color?op.color.r:0.0,
                g: op.color?op.color.g:0.0,
                b: op.color?op.color.b:0.0 })
            .InLine(`

            float dt =1.- dot(wnm,normalize(camera-wps));
            float sp = dot(wnm,normalize(camera-wps));
            float dl = 1.-dot(wnm,normalize(vec3(1000.)-wps));

        vec2 uvz = pos.xz;
 
        vec3 ref3 = result.xyz ;
        
        if(abs(nrm.x) > 0.5 && abs(nrm.z)<0.5 && abs(nrm.y)<0.5  ) uvz = pos.yz;
        else if(abs(nrm.y) > 0.5 && abs(nrm.z)<0.5 && abs(nrm.x)<0.5  ) uvz = pos.xz;
        else if(abs(nrm.z) > 0.5 && abs(nrm.y)<0.5 && abs(nrm.x)<0.5  ) uvz = pos.yx; 
        else if(abs(nrm.x) > 0.5 && abs(nrm.z)>0.5 && abs(nrm.y)<0.5  ) uvz = pos.yz;
        else if(abs(nrm.y) > 0.5 && abs(nrm.x)>0.5 && abs(nrm.z)<0.5  ) uvz = pos.xz;
        else if(abs(nrm.z) > 0.5 && abs(nrm.y)>0.5 && abs(nrm.x)<0.5  ) uvz = pos.yx;  
        
        `)
        .Map({path:'/images/textures/ref1.jpg'})
        .Map({path:op.path ,uv:'vec2( r_y(vec3(uvz.x,0.,uvz.y) ,float('+op.uvr+'),vec3(0.5) ).xz* 50./ float('+op.uvs+') )'}).Func(function (mt) {
              
                return mt;
            })
            .InLine(`

            vec3 res_1 = result.xyz;

            `+(op.color ? '':'ref3 = vec3(1.);')+` 

            `+r_mur.reflect('0','wnm','pow(result.z,3.)*float('+op.bump+')',1,1,1,op.bios)+`
            
            result = vec4(ref3*result.xyz*(dt*float(`+op.phonge+`)*0.2+(1.-float(`+op.phonge+`))*0.2+0.9-dl*0.2),1.);
            result.xyz = mix(ref3*res_1.xyz,result.xyz,float(`+op.metal+`));

            result.xyz += (1.-sp)*pow(float(`+op.spec+`),float(`+op.sppow+`)) ;

            `);


            return me;
        };


        
        this.applyEvent(eng, eng.scene);
         eng.camera.attachControl(eng.canvas, true);

        eng.locker = eng.maker({ w: 100, h: 100 }, GB.models.faceXZ);
        eng.locker.visibility = 0.;
        eng.locker.isPickable = false;

      

        eng.locker.top = new BABYLON.Mesh();
        eng.locker.left = new BABYLON.Mesh();
        eng.locker.depth = new BABYLON.Mesh();

        eng.locker.top.isPickable = false;
        eng.locker.left.isPickable = false;
        eng.locker.depth.isPickable = false;

        eng.locker.top.parent = eng.locker;
        eng.locker.top.position.x = 1;

        eng.locker.left.parent = eng.locker;
        eng.locker.left.position.z = 1;

        eng.locker.depth.parent = eng.locker;
        eng.locker.depth.position.y = 1;

       
        __log('scene is Ready.');

        window.eng = eng;

        eng.startDt = new Date().getTime();
        var th = this;

        eng.scene.parts = [];

        dyHtml.script('/models/'+location.search.replaceAll('?','')+'.js', function (p, l) {  

           
           for(var i in l.parts){ 
            for(var j in l.parts[i]){



                if( !eng.scene.parts[i] )eng.scene.parts[i]  = [];

                if(l.parts[i][j].mode == 'nurbs')
                eng.scene.parts[i][j] = th.nurbsCall(p.eng,l.parts[i][j],l.rims);
                else if(l.parts[i][j].mode == 'surface')
                eng.scene.parts[i][j] = th.surfaceCall(p.eng,l.parts[i][j],l.rims);
             
            }
           }

            __log( new Date().getTime() - eng.startDt ) ;

            eng.aiModel = 'public : model.parts = '+ JSON.stringify(l.parts_for_ai)+
            ' \n  ';


        },{eng:eng},true);


    },
    addFixedHelper: function (scene) {

    }
};