/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * scripts  
 * script
 * 
 * for run script without add as script tag (also can run script as local)
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */



var dy = {};
var dyHtml = {

  /**
   * 
   * for download content 
   * @param {url,type,success,begin,faild,end,progress} op 
   * type= GET,POST,PUT,DEL,PATCH
   */
  down: function (op) {
    op = def(op, {});
    op.type = def(op.type, "Get");
    op.url = def(op.url, "/");
    op.success = def(op.success, function (data) { });
    op.error = def(op.error, function (data) { });
    op.end = def(op.end, function () { });
    op.begin = def(op.begin, function () { });
    op.option = def(op.option, {});

    function processData(data) {
      op.success(data, op.option);
    }

    function handler() {
      op.subProgress = def(op.subProgress, function (p) { });
      op.subProgress(this);
      if (this.readyState == this.DONE) {
        if (this.status == 200) {
          // success!
          processData(this.responseText);
        } else {
          op.error(this);
        }
        op.end();
      }
    }

    try {
      var client = new XMLHttpRequest();

      client.onreadystatechange = handler;
      client.open(op.type, op.url);
      client.setRequestHeader('Access-Control-Allow-Origin', '*');
      op.begin(client);
      client.send();
      client.onprogress = function (pe) {
        if (pe.lengthComputable) {
          op.progress = def(op.progress, function (p) { });
          op.progress(pe.loaded * 100 / pe.total);
        }
      };
    } catch (e) {
      op.error(e);
      op.end();
    }
  }
  /**
 * 
 * for upload content
 * @param {url,type,success,begin,faild,end,progress} op 
 * type= GET,POST,PUT,DEL,PATCH
 */
  , upload: function (op) {
    op = def(op, {});
    op.type = def(op.type, "POST");
    op.url = def(op.url, "/");
    op.success = def(op.success, function (data) { });
    op.error = def(op.error, function (data) { });
    op.end = def(op.end, function () { });
    op.begin = def(op.begin, function () { });

    function processData(data) {
      op.success(data);
    }

    function handler() {
      if (this.readyState == this.DONE) {
        if (this.status == 200) {
          // success!
          processData(this.responseText);
        } else {
          op.error(this);
        }
        op.end();
      }
    }

    try {
      var client = new XMLHttpRequest();
      op.begin(client);
      client.onreadystatechange = handler;
      if ("withCredentials" in client) {
        client.open(op.type, op.url, true);
        client.upload.onprogress = function (pe) {
          if (pe.lengthComputable) {
            op.progress = def(op.progress, function (p) { });
            op.progress(pe.loaded * 100 / pe.total);
          }
        };
      } else if (typeof XDomainRequest != "undefined") {
        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        client = new XDomainRequest();
        client.onreadystatechange = handler;

        client.open(op.type, op.url);
        client.upload.onprogress = function (pe) {
          if (pe.lengthComputable) {
            op.progress = def(op.progress, function (p) { });
            op.progress(pe.loaded * 100 / pe.total);
          }
        };
      }

      if (def(op.file)) {
        var data = new FormData();
        _for(
          op.file,
          function (at, i) {
            data.append("file" + i, at.data);
          },
          function () {
            client.setRequestHeader("content", JSON.stringify(op.data));
            client.send(data);
            client.upload.onprogress = function (pe) {
              if (pe.lengthComputable) {
                op.progress = def(op.progress, function (p) { });
                op.progress(pe.loaded * 100 / pe.total);
              }
            };
          }
        );
      } else {
        client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        client.send(def(op.data, false) ? JSON.stringify(op.data) : "");
        client.onprogress = function (pe) {
          if (pe.lengthComputable) {
            op.progress = def(op.progress, function (p) { });
            op.progress(pe.loaded * 100 / pe.total);
          }
        };
      }
    } catch (e) {
      op.error(e);
      op.end();
    }
  },
  get: function (ctl, key) {
    if (!key) return TsID[ctl.iden];
    if (key) return TsID[ctl.iden][key];
  },
  getDyElement: function (sel) {
    if (!first(sel) || first(sel).iden) return null;
    return tsID[first(sel).iden];
  }
  , script: function (p, fn, prm, localJs) {

    dyHtml.down({
      url: p,
      success: function (d) {
        if (localJs) {
          var local = {};
          local = js(d);
          if (fn) fn(prm, local);
        } else {
          window.eval(d);
          if (fn) fn(prm);
        }
      }
    });
  }
  , scripts: function (ps, fn, n, isLocal) {


    if (n == undefined) {
      dyHtml.scripts(ps, fn, 0, isLocal);
      return;
    }

    if (n < ps.length) {
      dyHtml.script(ps[n], n == ps.length - 1 ? fn : function (op, l) {
        dyHtml.scripts(ps, fn, n + 1, isLocal);
      }, null, isLocal);
    }
  }
  ,append:function(par,itm,page,path,item,template ){
    var div = document.createElement('div');

    var data = itm;
    data.type = itm.type;
    data.name = i;
    data.title = itm.title;

    div.className = 'w-full';

    data.page = page;
    data.path = path;
    data.item = def(itm.item,1) ;

    div.data = data; 

     par.appendChild(div); 
 


    dyHtml.loader(div, data,template);
  }
  , loader: function (tid, data, template) { 
      

    if (   typeof (tid) != "number") {

      if (!tid || !tid.iden) { 

        TsID[++temp_baseIdentity] = { ctrl:tid  };
       
        tid = temp_baseIdentity;
      } else tid = (tid.iden);
    }

    if (!TsID[tid]) {

      console.log('Error Replace:', tid + ' not found component!');
      return;
    }

    var ctl = TsID[tid].ctrl;

    var th = { parentNode: ctl };
    th.nextElementSibling = {
      value: template ? template : TsID[tid].template,
      attributes: {
        "params": { value: data },
      },

      setAttribute: function (n, v) {
        th.nextElementSibling.attributes[n] = { value: v };
      },

    };



    if (typeof (data) == "object") {


      if (data.length) {
        elementPageRepeat(th, tid, true);
      } else {

        th.nextElementSibling.attributes = {
          "params": { value: data },
          "path": { value: data.path },
          "page": { value: data.page },
        };
        th.nextElementSibling.setAttribute = function (n, v) {
          th.nextElementSibling.attributes[n] = { value: v };
        };

        elementPageLoad(th, tid, true);
      }

    } else if (typeof (data) == "number") {

      th.nextElementSibling.attributes['oncreate'] = { value: 'item = ' + data + ';' };
      elementPageSwitch(th, tid, true);

    } else if (typeof (data) == "string") {



    }



  }


};


var temp_baseIdentity = 0;
var temp_objectIden = 0;
var temp_object = [];
var bimg = `data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
    9TXL0Y4OHwAAAABJRU5ErkJggg==`;

function initInnerContent(d, fn, fs, pms, fe) {

  fn = def(fn, function (d) {
    return d;
  });
  fs = def(fs, function (d) {
    return d;
  });
 
  


  d = d
 .replaceAll(
    "<loader",
    ` <img src="$$bimg" onload="elementPageLoad(this,$$TID)" /><tmp class="hdn-i" `
  ) .replaceAll(
    "<iloader",
    `<div ><img src="$$bimg" onload="elementPageLoad(this,$$TID)" /><tmp class="hdn-i"`
  ).replaceAll(
      "<repeater",
      `<img src="$$bimg" onload="elementPageRepeat(this,$$TID)" /><textarea class="hdn-i" `
    )
    .replaceAll(
      "<switcher",
      `<img src="$$bimg" onload="elementPageSwitch(this,$$TID)" /><textarea class="hdn-i" `
    )
    .replaceAll(
      "<dy",
      `<img src="$$bimg" onload="elementPageDynamic(this,$$TID)" /><textarea class="hdn-i" `
    )
    .replaceAll("</loader>", ` </tmp> `)
    .replaceAll("</iloader>", ` </tmp></div>`)
    .replaceAll("</repeater>", `</textarea>`)
    .replaceAll("$$root", dy.basePath)
    .replaceAll("$$src=", "src=")
    .replaceAll("$$date", new Date().getTime())
    .replaceAll("$$images", "/images") 
    .replaceAll("$$bimg",bimg);

  if (pms) {
    for (var pm in pms) {

      if (typeof (pms[pm]) == 'object') {
        temp_objectIden++;
        temp_object[temp_objectIden] = pms[pm];
        d = d.replaceAll('$$' + pm, 'temp_object[' + temp_objectIden + ']');

      } else
        d = d.replaceAll('$$' + pm, pms[pm]);
    }
  }

  var sd0 = [];
  if (d.indexOf("/// main content") != -1) {
    sd0 = d.split("/// main content");


    d = sd0[1];
    TsID[pms.TID] = def(TsID[pms.TID], {});
    TsID[pms.TID].initSscript = fs(sd0[0]).replace("<script>", "").replace("</script>", "JsIden++;");

    callInitialized(pms.TID, function (d) {

    });
  }

  var sd = [];
  if (d.indexOf("/// background script") != -1) {
    sd = d.split("/// background script");
    d = sd[0];
  }
  fn(d);
  if (sd.length != 0) {
    window.eval(fs(sd[1]).replace("<script>", "").replace("</script>", "JsIden++;").replaceAll('$$_', 'TsID[' + pms.TID + '].'));
    fe(TsID[pms.TID]);
  }
}


window.behindLoopContainer = [];
window.behindLoop = function () {

  for (var i in window.behindLoopContainer)
    if (window.behindLoopContainer[i])
      window.behindLoopContainer[i]();

  requestAnimationFrame(window.behindLoop);
};
window.behindLoop();
window.TsID = [];
window.TsName = [];

window.rootUps = [];
window.rootMoves = [];
window.rootClick = [];
window.rootWheel = [];


window.winWheel = function (evt) {
  for (var ie in rootWheel) {
    rootWheel[ie](evt);
  }
};

window.winClick = function (evt) {
  for (var ie in rootClick) {
    rootClick[ie](evt);
  }
};

window.winMove = function (evt) {

  for (var ie in rootMoves) {
    rootMoves[ie](evt);
  }

};

window.winUp = function (evt) {

  for (var ie in rootUps) {
    rootUps[ie](evt);
  }
};

window.init_page = function (d, json) {


  for (var it in json) {
    d = d.replaceAll('$$' + it, json[it]);
  }
  return d;
};

document.addEventListener('mousemove', winMove);
document.addEventListener('mouseup', winUp);
document.addEventListener('click', winClick);
document.addEventListener('wheel', winWheel);


var callInitialized = function (tid, f) {
  var callScript = null;
  if (TsID[tid] && TsID[tid].initSscript) {

    callScript = js('callScript =   function(f){' + TsID[tid].initSscript.replaceAll('$$_', 'TsID[' + tid + '].') + ' TsID[' + tid + '].scriptApplyed = true; f(TsID[' + tid + '].data);  }');
  }

  if (callScript) callScript(f);
  else f();
};

window.elementPageLoad = function (th, tid, noNeedParse) {


  var nxt = th.nextElementSibling;
 

  var par = th.parentNode;
  par.iden = tid; 
  if (TsID[tid] && TsID[tid].name)
    par.name = TsID[tid].name;

  if (!nxt.attributes['page']) nxt.setAttribute('page', 'icon');
  if (!nxt.attributes['path']) nxt.setAttribute('path', '/');
  if (!nxt.attributes['params']) nxt.setAttribute('params', '{}');


  if (nxt.attributes['online']) nxt.online = js('function(p){var element = p;var me = p.event;' + nxt.attributes['online'].value + '}');
  if (nxt.attributes['onready']) nxt.onready = js('function(element,model){ ' + nxt.attributes['onready'].value + '}');

   par.onready = nxt.onready;

  var param;
  if (!noNeedParse)
    param = js(nxt.attributes['params'].value.replaceAll('$$_', 'TsID[' + tid + '].'));
  else
    param = nxt.attributes['params'].value;

  loadPage(nxt.attributes['page'].value, par, null, nxt.attributes['path'].value, param, nxt.online);

};

window.elementPageRepeat = function (th, tid, noNeedParse) {

  var txt = th.nextElementSibling;

  callInitialized(tid, function () {

    var par = th.parentNode;
    par.iden = tid;

   
  if (TsID[tid] && TsID[tid].name)
    par.name = TsID[tid].name;

    if (!txt.attributes['params']) txt.setAttribute('params', '{}');

    if (txt.attributes['online']) txt.online = js('function(p){var element = p;var me = p.event;' + txt.attributes['online'].value + '}');

    var param;
    if (!noNeedParse)
      param = js(txt.attributes['params'].value.replaceAll('$$_', 'TsID[' + tid + '].'));
    else
      param = txt.attributes['params'].value;

    let txtValue = txt.value.replaceAll('$$_', 'TsID[' + tid + '].');

    if (txt.attributes['oncreate']) txt.oncreate = js('function(cont ,data,index){ var content = cont; ' + txt.attributes['oncreate'].value.replaceAll('$$_', 'TsID[' + tid + '].') + ' return content;}');

    if (!txt.oncreate) txt.oncreate = null;

    if (!TsID[tid]) TsID[tid] = {};

    TsID[tid].template = txt.value;
    TsID[tid].ctrl = par;

    var content = '';

    for (var i in param) {
      var ip = param[i];

      var c = txtValue;

      for (var j in ip) {
        c = c.replaceAll('$$' + j, (ip[j]));
      }

      if (txt.oncreate) {
        c = txt.oncreate(c, ip, i);
      }

      content += c;

    }

    par.innerHTML = content;

    txt.remove();
  });

};

window.elementPageSwitch = function (th, tid, noNeedParse) {

  var txt = th.nextElementSibling;


  if (TsID[tid] && TsID[tid].initSscript)
    js(TsID[tid].initSscript.replaceAll('$$_', 'TsID[' + tid + '].'), 'init script ' + tid + th.innerHTML);

  var par = th.parentNode;
  par.iden = tid;
 
  if (TsID[tid] && TsID[tid].name)
    par.name = TsID[tid].name;
 

  if (!txt.attributes['params']) th.setAttribute('params', '{}');

  if (txt.attributes['online']) th.online = js('function(p){var element = p;var me = p.event;' + th.attributes['online'].value + '}');


  var param;

  if (!noNeedParse)
    param = js(txt.attributes['params'].value.replaceAll('$$_', 'TsID[' + tid + '].'));
  else
    param = txt.attributes['params'].value;

  let txtValue = txt.value.split('$$next-case');

  if (txt.attributes['oncreate']) txt.oncreate = js('function(content,data){var item = 0;' + txt.attributes['oncreate'].value.replaceAll('$$_', 'TsID[' + tid + '].') + ' return item;}');

  if (!txt.oncreate) txt.oncreate = null;

  var content = '';

  if (!TsID[tid]) TsID[tid] = {};

  TsID[tid].template = txt.value;
  TsID[tid].ctrl = par;

  var ip = param;

  if (txt.oncreate)
    var item = txt.oncreate(c, ip);

  var c = txtValue[item].replaceAll('$$_', 'TsID[' + tid + '].');

  for (var j in ip) {
    c = c.replaceAll('$$' + j, (ip[j]));
  }

  content = c;


  par.innerHTML = content;

  if (!noNeedParse)
    txt.remove();

};

window.elementPageDynamic = function (th, tid) {

  var txt = th.nextElementSibling;


  if (TsID[tid] && TsID[tid].initSscript)
    js(TsID[tid].initSscript.replaceAll('$$_', 'TsID[' + tid + '].'));

  var par = th.parentNode;
  if (!txt.attributes['params']) th.setAttribute('params', '{}');

  if (txt.attributes['online']) th.online = js('function(p){var element = p;var me = p.event;' + th.attributes['online'].value + '}');


  var param = js(txt.attributes['params'].value.replaceAll('$$_', 'TsID[' + tid + '].'));

  let txtValue = txt.value;

  if (txt.attributes['oncreate']) txt.oncreate = js('function(content,data){var item = 0;' + txt.attributes['oncreate'].value.replaceAll('$$_', 'TsID[' + tid + '].') + ' return content;}');

  if (!txt.oncreate) txt.oncreate = null;

  var content = '';

  var ip = param;

  if (txt.oncreate)
    c = txt.oncreate(c, ip);

  var c = txtValue;

  for (var j in ip) {
    c = c.replaceAll('$$' + j, (ip[j]));
  }

  content = c;

  par.innerHTML = content;

  txt.remove();

};

let dyHtmlExtensionFormat = ".htm";

window.loadPage = function (page, ctl, fun, root, pms, fs) {
  dyHtml.down({
    url: def(root, '/_src/Component/') + page + dyHtmlExtensionFormat, success: function (d) {
      temp_baseIdentity++;
      pms = def(pms, {});
      pms.TID = temp_baseIdentity;
      initInnerContent(d, function (d1) {

        if (TsID[pms.TID] != undefined) {

          d1 = init_page(d1, TsID[pms.TID].data);
          TsID[pms.TID].ctrl = ctl;

        }

        if (!fun) ctl.innerHTML = d1;
        else fun(ctl, d1, pms);

      }, null, pms, function () {
        pms.event = TsID[pms.TID];
        pms.ready = ctl.onready;
        if (fs) fs(pms);
      });
    }
  });
};

dyHtml.down({
  url: '/dy.json', success: function (config) {

    dy = mix(dy, JSON.parse(config), true);

    first('#tempCss').remove();

    dyHtmlExtensionFormat = dy.extension;

    var par = document.head;
    loadPage('head', par, function (d2, c2) {
      d2.innerHTML += c2;
    }, dy.layout, pageConfig);

    var par = document.body;
    loadPage('body', par, null, dy.layout, pageConfig);
  }
})




