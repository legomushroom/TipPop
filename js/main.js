// create new main class
var main;
createNewMain();




// MVC MOVE model
main.m = {
  // vars to debug in console here
  debug: new function(){

  },
  //settungs to main class
  settings:{
    console:$('div#console')
  },
  //current state of main class
  state:{

  },
  fetchPosts: function (){
    //---------------------------------
    main.makeProfile('fetchPost','Collapsed');
    //----------body------------

    //----------body ends-------
    main.makeProfileEnd('fetchPost');
  }
};






// MVC MOVE operations
main.o = {
  init: function (){
    // console log global debug object
    // to replace vanilla console
    // * consoles in zero-level console
    console.log(main.m.debug);
    main.makeProfile('init');
    //----------body------------
    main.v.console('init');
    //----------body ends-------
    main.makeProfileEnd('init');
  }
};










// MVC MOVE views
main.v = {
  console: function (string,type){
    main.m.settings.console.append('<p class='+(type||'log')+'>'+string+'<p>');
  }
};










// MVC MOVE events
main.e = {
  listen: function (){
    main.makeProfile('listen','Collapsed');
    //----------body------------
    

    //----------body ends-------
    main.makeProfileEnd('listen');
  }
};











// init main class
main.o.init();

// create new main fun with helpers prototypes
function createNewMain(){
  main = function (){};

  // generate profile end
    main.prototype.makeProfile = function(name,type){
    console['group'+(type||'')](name);
    console.profile(name);
    console.time(name + ' takes');
  }

  // generate console.profile end
  main.prototype.makeProfileEnd = function(name){
    console.timeEnd(name+' takes');
    console.profileEnd(name);
    console.groupEnd(name);
  }
       
    main = new main;
}
