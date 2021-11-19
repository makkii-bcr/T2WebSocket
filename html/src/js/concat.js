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
        _this.host = "t2ws.mkbcr.net";
        
        if (WebSite.isNW) {
          Tonyu.globals.$port=443;
          Tonyu.globals.$connectURL="localhost";
          
        } else {
          Tonyu.globals.$port=443;
          Tonyu.globals.$connectURL=_this.host;
          
        }
        Tonyu.globals.$pad=new Tonyu.classes.kernel.Pad({buttonCnt: 4,alpha: 255,active: false});
        Tonyu.globals.$pad.alpha=0;
        Tonyu.globals.$ws=new Tonyu.classes.user.WS;
        new Tonyu.classes.user.MyChar;
        Tonyu.globals.$latency=0;
        Tonyu.globals.$latencyMin=30000;
        Tonyu.globals.$latencyMinTime=performance.now();
        Tonyu.globals.$latencyMax=0;
        Tonyu.globals.$latencyMaxTime=performance.now();
        while (true) {
          Tonyu.checkLoop();
          if (_this.getkey(1)==0&&Tonyu.globals.$touches[0].touched==1) {
            Tonyu.globals.$pad.alpha=255;
            Tonyu.globals.$pad.active=true;
            
          }
          _this.nowTime=performance.now();
          if (_this.nowTime-Tonyu.globals.$latencyMinTime>=10000) {
            Tonyu.globals.$latencyMin=Tonyu.globals.$latency;
            Tonyu.globals.$latencyMinTime=_this.nowTime;
            
          }
          if (_this.nowTime-Tonyu.globals.$latencyMaxTime>=10000) {
            Tonyu.globals.$latencyMax=Tonyu.globals.$latency;
            Tonyu.globals.$latencyMaxTime=_this.nowTime;
            
          }
          if (Tonyu.globals.$latency<Tonyu.globals.$latencyMin) {
            Tonyu.globals.$latencyMin=Tonyu.globals.$latency;
            Tonyu.globals.$latencyMinTime=_this.nowTime;
            
          }
          if (Tonyu.globals.$latency>Tonyu.globals.$latencyMax) {
            Tonyu.globals.$latencyMax=Tonyu.globals.$latency;
            Tonyu.globals.$latencyMaxTime=_this.nowTime;
            
          }
          _this.drawText(Tonyu.globals.$screenWidth-2-150,2,"ping:"+Tonyu.globals.$latency+"ms","rgb(255,255,255)",16);
          _this.drawText(Tonyu.globals.$screenWidth-2-150,2+20,"pingMin:"+Tonyu.globals.$latencyMin+"ms","rgb(255,255,255)",16);
          _this.drawText(Tonyu.globals.$screenWidth-2-150,2+40,"pingMax:"+Tonyu.globals.$latencyMax+"ms","rgb(255,255,255)",16);
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
              
              _this.host = "t2ws.mkbcr.net";
              
              if (WebSite.isNW) {
                Tonyu.globals.$port=443;
                Tonyu.globals.$connectURL="localhost";
                
              } else {
                Tonyu.globals.$port=443;
                Tonyu.globals.$connectURL=_this.host;
                
              }
              Tonyu.globals.$pad=new Tonyu.classes.kernel.Pad({buttonCnt: 4,alpha: 255,active: false});
              Tonyu.globals.$pad.alpha=0;
              Tonyu.globals.$ws=new Tonyu.classes.user.WS;
              new Tonyu.classes.user.MyChar;
              Tonyu.globals.$latency=0;
              Tonyu.globals.$latencyMin=30000;
              Tonyu.globals.$latencyMinTime=performance.now();
              Tonyu.globals.$latencyMax=0;
              Tonyu.globals.$latencyMaxTime=performance.now();
            case 2:
              if (_this.getkey(1)==0&&Tonyu.globals.$touches[0].touched==1) {
                Tonyu.globals.$pad.alpha=255;
                Tonyu.globals.$pad.active=true;
                
              }
              _this.nowTime=performance.now();
              if (_this.nowTime-Tonyu.globals.$latencyMinTime>=10000) {
                Tonyu.globals.$latencyMin=Tonyu.globals.$latency;
                Tonyu.globals.$latencyMinTime=_this.nowTime;
                
              }
              if (_this.nowTime-Tonyu.globals.$latencyMaxTime>=10000) {
                Tonyu.globals.$latencyMax=Tonyu.globals.$latency;
                Tonyu.globals.$latencyMaxTime=_this.nowTime;
                
              }
              if (Tonyu.globals.$latency<Tonyu.globals.$latencyMin) {
                Tonyu.globals.$latencyMin=Tonyu.globals.$latency;
                Tonyu.globals.$latencyMinTime=_this.nowTime;
                
              }
              if (Tonyu.globals.$latency>Tonyu.globals.$latencyMax) {
                Tonyu.globals.$latencyMax=Tonyu.globals.$latency;
                Tonyu.globals.$latencyMaxTime=_this.nowTime;
                
              }
              _this.drawText(Tonyu.globals.$screenWidth-2-150,2,"ping:"+Tonyu.globals.$latency+"ms","rgb(255,255,255)",16);
              _this.drawText(Tonyu.globals.$screenWidth-2-150,2+20,"pingMin:"+Tonyu.globals.$latencyMin+"ms","rgb(255,255,255)",16);
              _this.drawText(Tonyu.globals.$screenWidth-2-150,2+40,"pingMax:"+Tonyu.globals.$latencyMax+"ms","rgb(255,255,255)",16);
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
  decls: {"methods":{"main":{"nowait":false}},"fields":{"host":{},"nowTime":{}}}
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
          if (_this.otime>=60*20) {
            _this.alpha*=(60*30-_this.otime)/(60*10);
          }
          if (_this.alpha<=0) {
            _this.alpha=0;
            
          } else {
            _this.drawText(_this.x-12,_this.y+16,(_this.playerNo+1)+"P","rgb(255,255,255)",16);
            _this.drawText(_this.x-12,_this.y+16+15,(_this.latency)+"ms","rgb(255,255,255)",12);
            
          }
          _this.otime++;
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
              if (_this.otime>=60*20) {
                _this.alpha*=(60*30-_this.otime)/(60*10);
              }
              if (_this.alpha<=0) {
                _this.alpha=0;
                
              } else {
                _this.drawText(_this.x-12,_this.y+16,(_this.playerNo+1)+"P","rgb(255,255,255)",16);
                _this.drawText(_this.x-12,_this.y+16+15,(_this.latency)+"ms","rgb(255,255,255)",12);
                
              }
              _this.otime++;
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
  decls: {"methods":{"main":{"nowait":false}},"fields":{"playerNo":{},"otime":{},"latency":{}}}
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
        
        _this.otime=Tonyu.globals.$frameCount-60*5+30;
        _this.x=_this.rnd(Tonyu.globals.$screenWidth);
        _this.y=_this.rnd(Tonyu.globals.$screenHeight);
        _this.ox=_this.x;
        _this.oy=_this.y;
        _this.alpha=255;
        while (true) {
          Tonyu.checkLoop();
          if (Tonyu.globals.$myNo!=null) {
            _this.p=Tonyu.globals.$myNo;
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
          _this.x=_this.clamp(16,Tonyu.globals.$screenWidth-16,_this.x);
          _this.y=_this.clamp(16,Tonyu.globals.$screenHeight-32,_this.y);
          if (_this.x!=_this.ox||_this.y!=_this.oy||Tonyu.globals.$frameCount-_this.otime>=60*5) {
            _this.ox=_this.x;
            _this.oy=_this.y;
            _this.otime=Tonyu.globals.$frameCount;
            _this.o = {mes: "playerXY",time: performance.now(),playerNo: Tonyu.globals.$myNo,x: _this.x,y: _this.y,latency: Tonyu.globals.$latency};
            
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
        
        _this.otime=Tonyu.globals.$frameCount-60*5+30;
        _this.x=_this.rnd(Tonyu.globals.$screenWidth);
        _this.y=_this.rnd(Tonyu.globals.$screenHeight);
        _this.ox=_this.x;
        _this.oy=_this.y;
        _this.alpha=255;
        
        _thread.enter(function _trc_MyChar_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
            case 1:
              if (Tonyu.globals.$myNo!=null) {
                _this.p=Tonyu.globals.$myNo;
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
              _this.x=_this.clamp(16,Tonyu.globals.$screenWidth-16,_this.x);
              _this.y=_this.clamp(16,Tonyu.globals.$screenHeight-32,_this.y);
              if (_this.x!=_this.ox||_this.y!=_this.oy||Tonyu.globals.$frameCount-_this.otime>=60*5) {
                _this.ox=_this.x;
                _this.oy=_this.y;
                _this.otime=Tonyu.globals.$frameCount;
                _this.o = {mes: "playerXY",time: performance.now(),playerNo: Tonyu.globals.$myNo,x: _this.x,y: _this.y,latency: Tonyu.globals.$latency};
                
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
  decls: {"methods":{"main":{"nowait":false}},"fields":{"o":{},"otime":{},"ox":{},"oy":{}}}
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
        
        _this.url = "wss://"+Tonyu.globals.$connectURL+":"+Tonyu.globals.$port;
        
        _this.sock=new WebSocket(_this.url);
        _this.sock.addEventListener("open",(function anonymous_222(e) {
          
          _this.print("open",e);
        }));
        _this.sock.addEventListener("message",(function anonymous_290(e) {
          
          _this.recvProc(e.data);
        }));
        _this.sock.addEventListener("close",(function anonymous_390(e) {
          
          _this.print("close",e);
        }));
        _this.sock.addEventListener("error",(function anonymous_457(e) {
          
          _this.print("error",e);
        }));
        Tonyu.globals.$mirrorAry=[];
      },
      fiber$main :function _trc_WS_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.url = "wss://"+Tonyu.globals.$connectURL+":"+Tonyu.globals.$port;
        
        _this.sock=new WebSocket(_this.url);
        _this.sock.addEventListener("open",(function anonymous_222(e) {
          
          _this.print("open",e);
        }));
        
        _thread.enter(function _trc_WS_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.sock.addEventListener("message",(function anonymous_290(e) {
                
                _this.recvProc(e.data);
              }));
              _this.sock.addEventListener("close",(function anonymous_390(e) {
                
                _this.print("close",e);
              }));
              _this.sock.addEventListener("error",(function anonymous_457(e) {
                
                _this.print("error",e);
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
        var m;
        var o;
        var playerNo;
        
        obj = JSON.parse(d);
        
        if (obj.mes=="_start") {
          Tonyu.globals.$myNo=obj.playerNo;
          _this.print("myNo:"+(Tonyu.globals.$myNo+1)+"P");
          
        } else {
          if (obj.mes=="_close") {
            m = Tonyu.globals.$mirrorAry[obj.playerNo];
            
            if (m) {
              m.otime=60*25;
              
            }
            _this.print("close:",(obj.playerNo+1)+"P");
            
          } else {
            if (obj.mes=="_ping") {
              o = {mes: "_ping"};
              
              _this.send(JSON.stringify(obj));
              
            } else {
              if (obj.mes=="playerXY") {
                playerNo = obj.playerNo;
                
                if (playerNo==null) {
                  return _this;
                }
                m = Tonyu.globals.$mirrorAry[playerNo];
                
                if (! m) {
                  _this.print("connect:",(playerNo+1)+"P");
                  m=new Tonyu.classes.user.Mirror({playerNo: playerNo,x: - 999,y: - 999,p: playerNo,zOrder: 10,otime: 0});
                  Tonyu.globals.$mirrorAry[playerNo]=m;
                  
                }
                m.x=obj.x;
                m.y=obj.y;
                m.otime=0;
                m.latency=obj.latency;
                if (playerNo==Tonyu.globals.$myNo) {
                  Tonyu.globals.$latency=_this.floor(performance.now()-obj.time);
                  
                }
                
              }
            }
          }
        }
      },
      fiber$recvProc :function _trc_WS_f_recvProc(_thread,d) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var obj;
        var m;
        var o;
        var playerNo;
        
        obj = JSON.parse(d);
        
        
        _thread.enter(function _trc_WS_ent_recvProc(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              if (!(obj.mes=="_start")) { __pc=1     ; break; }
              {
                Tonyu.globals.$myNo=obj.playerNo;
                _this.print("myNo:"+(Tonyu.globals.$myNo+1)+"P");
              }
              __pc=9     ;break;
            case 1     :
              if (!(obj.mes=="_close")) { __pc=2     ; break; }
              {
                m = Tonyu.globals.$mirrorAry[obj.playerNo];
                
                if (m) {
                  m.otime=60*25;
                  
                }
                _this.print("close:",(obj.playerNo+1)+"P");
              }
              __pc=8     ;break;
            case 2     :
              if (!(obj.mes=="_ping")) { __pc=4     ; break; }
              o = {mes: "_ping"};
              
              _this.fiber$send(_thread, JSON.stringify(obj));
              __pc=3;return;
            case 3:
              
              __pc=7     ;break;
            case 4     :
              if (!(obj.mes=="playerXY")) { __pc=6     ; break; }
              playerNo = obj.playerNo;
              
              if (!(playerNo==null)) { __pc=5     ; break; }
              _thread.exit(_this);return;
            case 5     :
              
              m = Tonyu.globals.$mirrorAry[playerNo];
              
              if (! m) {
                _this.print("connect:",(playerNo+1)+"P");
                m=new Tonyu.classes.user.Mirror({playerNo: playerNo,x: - 999,y: - 999,p: playerNo,zOrder: 10,otime: 0});
                Tonyu.globals.$mirrorAry[playerNo]=m;
                
              }
              m.x=obj.x;
              m.y=obj.y;
              m.otime=0;
              m.latency=obj.latency;
              if (playerNo==Tonyu.globals.$myNo) {
                Tonyu.globals.$latency=_this.floor(performance.now()-obj.time);
                
              }
            case 6     :
              
            case 7     :
              
            case 8     :
              
            case 9     :
              
              _thread.exit(_this);return;
            }
          }
        });
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false},"send":{"nowait":false},"recvProc":{"nowait":false}},"fields":{"url":{},"sock":{}}}
});

//# sourceMappingURL=concat.js.map