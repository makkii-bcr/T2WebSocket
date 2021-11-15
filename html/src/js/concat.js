Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Main_main() {
        "use strict";
        var _this=this;
        
        _this.updateEx(5);
        _this.host = window.document.location.host.replace(/:.*/,'');
        
        Tonyu.globals.$port=8888;
        if (_this.host=="phmobapkconpplimipcfhkkmdfiklnkh") {
          Tonyu.globals.$connectURL="localhost:"+Tonyu.globals.$port;
          
        } else {
          Tonyu.globals.$connectURL=_this.host+":"+Tonyu.globals.$port;
          
        }
        Tonyu.globals.$pad=new Tonyu.classes.kernel.Pad({buttonCnt: 4,alpha: 255,active: false});
        Tonyu.globals.$pad.alpha=0;
        Tonyu.globals.$ws=new Tonyu.classes.user.WS;
        new Tonyu.classes.user.MyChar;
        while (true) {
          Tonyu.checkLoop();
          if (_this.getkey(1)==0&&Tonyu.globals.$touches[0].touched==1) {
            Tonyu.globals.$pad.alpha=255;
            Tonyu.globals.$pad.active=true;
            
          }
          _this.update();
          
        }
      },
      fiber$main :function _trc_Main_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        
        _thread.enter(function _trc_Main_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$updateEx(_thread, 5);
              __pc=1;return;
            case 1:
              
              _this.host = window.document.location.host.replace(/:.*/,'');
              
              Tonyu.globals.$port=8888;
              if (_this.host=="phmobapkconpplimipcfhkkmdfiklnkh") {
                Tonyu.globals.$connectURL="localhost:"+Tonyu.globals.$port;
                
              } else {
                Tonyu.globals.$connectURL=_this.host+":"+Tonyu.globals.$port;
                
              }
              Tonyu.globals.$pad=new Tonyu.classes.kernel.Pad({buttonCnt: 4,alpha: 255,active: false});
              Tonyu.globals.$pad.alpha=0;
              Tonyu.globals.$ws=new Tonyu.classes.user.WS;
              new Tonyu.classes.user.MyChar;
            case 2:
              if (_this.getkey(1)==0&&Tonyu.globals.$touches[0].touched==1) {
                Tonyu.globals.$pad.alpha=255;
                Tonyu.globals.$pad.active=true;
                
              }
              _this.fiber$update(_thread);
              __pc=3;return;
            case 3:
              
              __pc=2;break;
            case 4     :
              
              _thread.exit(_this);return;
            }
          }
        });
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"host":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Mirror',
  shortName: 'Mirror',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Mirror_main() {
        "use strict";
        var _this=this;
        
        while (true) {
          Tonyu.checkLoop();
          _this.alpha=_this.playerNo==Tonyu.globals.$myNo?64:255;
          _this.drawText(_this.x-16,_this.y+16,_this.playerNo+"P","rgb(255,255,255)",16);
          _this.update();
          
        }
      },
      fiber$main :function _trc_Mirror_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        
        _thread.enter(function _trc_Mirror_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
            case 1:
              _this.alpha=_this.playerNo==Tonyu.globals.$myNo?64:255;
              _this.drawText(_this.x-16,_this.y+16,_this.playerNo+"P","rgb(255,255,255)",16);
              _this.fiber$update(_thread);
              __pc=2;return;
            case 2:
              
              __pc=1;break;
            case 3     :
              
              _thread.exit(_this);return;
            }
          }
        });
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"playerNo":{}}}
});
Tonyu.klass.define({
  fullName: 'user.MyChar',
  shortName: 'MyChar',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_MyChar_main() {
        "use strict";
        var _this=this;
        
        _this.ox=- 9999;
        _this.oy=- 9999;
        _this.x=_this.rnd(Tonyu.globals.$screenWidth);
        _this.y=_this.rnd(Tonyu.globals.$screenHeight);
        _this.alpha=255;
        while (true) {
          Tonyu.checkLoop();
          if (Tonyu.globals.$myNo!=null) {
            _this.p=Tonyu.globals.$myNo-1;
          } else {
            _this.p=Tonyu.globals.$pat_base+11;
          }
          if (_this.getkey(37)||Tonyu.globals.$pad.getLeft()) {
            _this.x-=3;
          }
          if (_this.getkey(38)||Tonyu.globals.$pad.getUp()) {
            _this.y-=3;
          }
          if (_this.getkey(39)||Tonyu.globals.$pad.getRight()) {
            _this.x+=3;
          }
          if (_this.getkey(40)||Tonyu.globals.$pad.getDown()) {
            _this.y+=3;
          }
          _this.x=_this.clamp(0,Tonyu.globals.$screenWidth,_this.x);
          _this.y=_this.clamp(0,Tonyu.globals.$screenHeight,_this.y);
          if (_this.x!=_this.ox||_this.y!=_this.oy) {
            _this.ox=_this.x;
            _this.oy=_this.y;
            _this.o = {mes: "playerXY",playerNo: Tonyu.globals.$myNo,x: _this.x,y: _this.y};
            
            Tonyu.globals.$ws.send(JSON.stringify(_this.o));
            
          }
          _this.update();
          
        }
      },
      fiber$main :function _trc_MyChar_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.ox=- 9999;
        _this.oy=- 9999;
        _this.x=_this.rnd(Tonyu.globals.$screenWidth);
        _this.y=_this.rnd(Tonyu.globals.$screenHeight);
        _this.alpha=255;
        
        _thread.enter(function _trc_MyChar_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
            case 1:
              if (Tonyu.globals.$myNo!=null) {
                _this.p=Tonyu.globals.$myNo-1;
              } else {
                _this.p=Tonyu.globals.$pat_base+11;
              }
              if (_this.getkey(37)||Tonyu.globals.$pad.getLeft()) {
                _this.x-=3;
              }
              if (_this.getkey(38)||Tonyu.globals.$pad.getUp()) {
                _this.y-=3;
              }
              if (_this.getkey(39)||Tonyu.globals.$pad.getRight()) {
                _this.x+=3;
              }
              if (_this.getkey(40)||Tonyu.globals.$pad.getDown()) {
                _this.y+=3;
              }
              _this.x=_this.clamp(0,Tonyu.globals.$screenWidth,_this.x);
              _this.y=_this.clamp(0,Tonyu.globals.$screenHeight,_this.y);
              if (_this.x!=_this.ox||_this.y!=_this.oy) {
                _this.ox=_this.x;
                _this.oy=_this.y;
                _this.o = {mes: "playerXY",playerNo: Tonyu.globals.$myNo,x: _this.x,y: _this.y};
                
                Tonyu.globals.$ws.send(JSON.stringify(_this.o));
                
              }
              _this.fiber$update(_thread);
              __pc=2;return;
            case 2:
              
              __pc=1;break;
            case 3     :
              
              _thread.exit(_this);return;
            }
          }
        });
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"o":{},"ox":{},"oy":{}}}
});
Tonyu.klass.define({
  fullName: 'user.WS',
  shortName: 'WS',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_WS_main() {
        "use strict";
        var _this=this;
        
        _this.sock=new WebSocket("ws://"+Tonyu.globals.$connectURL);
        _this.sock.addEventListener("open",(function anonymous_159(e) {
          
          _this.print("open");
        }));
        _this.sock.addEventListener("message",(function anonymous_224(e) {
          
          _this.recvProc(e.data);
        }));
        _this.sock.addEventListener("close",(function anonymous_323(e) {
          
          _this.print("close");
        }));
        _this.sock.addEventListener("error",(function anonymous_387(e) {
          
          _this.print("error");
        }));
        Tonyu.globals.$mirrorAry=[];
      },
      fiber$main :function _trc_WS_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.sock=new WebSocket("ws://"+Tonyu.globals.$connectURL);
        _this.sock.addEventListener("open",(function anonymous_159(e) {
          
          _this.print("open");
        }));
        
        _thread.enter(function _trc_WS_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.sock.addEventListener("message",(function anonymous_224(e) {
                
                _this.recvProc(e.data);
              }));
              _this.sock.addEventListener("close",(function anonymous_323(e) {
                
                _this.print("close");
              }));
              _this.sock.addEventListener("error",(function anonymous_387(e) {
                
                _this.print("error");
              }));
              Tonyu.globals.$mirrorAry=[];
              _thread.exit(_this);return;
            }
          }
        });
      },
      send :function _trc_WS_send(d) {
        "use strict";
        var _this=this;
        
        if (_this.sock.readyState==1) {
          _this.sock.send(d);
          
        }
      },
      fiber$send :function _trc_WS_f_send(_thread,d) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        if (_this.sock.readyState==1) {
          _this.sock.send(d);
          
        }
        
        _thread.retVal=_this;return;
      },
      recvProc :function _trc_WS_recvProc(d) {
        "use strict";
        var _this=this;
        var obj;
        var playerNo;
        var m;
        
        obj = JSON.parse(d);
        
        if (obj.mes=="_start") {
          Tonyu.globals.$myNo=obj.playerNo;
          _this.print("myNo:"+Tonyu.globals.$myNo);
          
        } else {
          if (obj.mes=="playerXY") {
            playerNo = obj.playerNo;
            
            m = Tonyu.globals.$mirrorAry[playerNo-1];
            
            if (! m) {
              m=new Tonyu.classes.user.Mirror({playerNo: playerNo,x: - 999,y: - 999,p: playerNo-1,zOrder: 10});
              Tonyu.globals.$mirrorAry[playerNo-1]=m;
              
            }
            m.x=obj.x;
            m.y=obj.y;
            
          }
        }
      },
      fiber$recvProc :function _trc_WS_f_recvProc(_thread,d) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var obj;
        var playerNo;
        var m;
        
        obj = JSON.parse(d);
        
        if (obj.mes=="_start") {
          Tonyu.globals.$myNo=obj.playerNo;
          _this.print("myNo:"+Tonyu.globals.$myNo);
          
        } else {
          if (obj.mes=="playerXY") {
            playerNo = obj.playerNo;
            
            m = Tonyu.globals.$mirrorAry[playerNo-1];
            
            if (! m) {
              m=new Tonyu.classes.user.Mirror({playerNo: playerNo,x: - 999,y: - 999,p: playerNo-1,zOrder: 10});
              Tonyu.globals.$mirrorAry[playerNo-1]=m;
              
            }
            m.x=obj.x;
            m.y=obj.y;
            
          }
        }
        
        _thread.retVal=_this;return;
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false},"send":{"nowait":false},"recvProc":{"nowait":false}},"fields":{"sock":{}}}
});

//# sourceMappingURL=concat.js.map