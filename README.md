
Dynamic HTML

#1. install & run

  1.1 initialize server :   >npm install -g http-server

  1.2 call server :   >http-server

. Ceo && Static Non-Script Content - index.HTML and pages 
. All Page Body And Head Managed in direction -> _layout/
. All Css Managed in direction -> _Src/Css/
. All Genrated Css Managed in direction -> _Src/Css/liveCss.htm


component format 

../../[component name].htm

# Structure  
    discription 
    <script>
        this part only initialized and used in loader,repeater and switcher   
    </script> 
    /// main content
    HTML DOM ( this part be rendered in the Main result)
    /// background script
    <script>
      this part run after Dom Applyed in Main Page
    </script> 
 

component usage
 
      <loader
          page="[compunent page name]"
          path="[compunent Directory Path]" 
          params="[ JSON parameters]"
            ></Loader> 
  

live replace usage
 
      <dy   params="[ array of JSON parameters]"
            >
          [ Content ]      
      </dy> 
 

repeater usage
 
      <repeater 
          params="[ array of JSON parameters]"
            >
          [ repeated Content ]      
      </repeater> 
 

switcher usage
 
      <switcher 
          params="[ array of JSON parameters]" oncreate='item = 3'
            >
          [ case 1 Content ]      
          $$next-case
          [ case 2 Content ]      
          $$next-case
          
          .
          .
          .

      </switcher> 
  

# Sample 1 - Classic HTML

../../body.htm
 
      <div>test1</div>
 

# Sample 2 - Classic HTML + Javascript

../../body.htm
 
      <div id='_$$TID'>test1</div>
      /// background script
      <script>
        document.getElementById('_$$TID').innerHTML = 'test2';
      </script> 
 

# Sample 3 - Dynamic Html + Binding JSON 

../../components/sample.htm
  
      <div>$$text</div>
 

../../body.htm
  
    <script>
      $$_data = { text:'Data 1' };
    </script> 
    /// main content
    <loader page='sample' path="../../components/" params="$$_data">
    </loader>
 




