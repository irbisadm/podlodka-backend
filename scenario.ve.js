require(Modules.Conference);

let conf = null;

VoxEngine.addEventListener(AppEvents.Started, ()=>{
  Logger.write('[APP] Conference started');
  conf = VoxEngine.createConference();
  conf.addEventListener(ConferenceEvents.EndpointRemoved,()=>{
    Logger.write('[APP] Participant removed');
    if(conf.getList().length){
      Logger.write('[APP] Nothing there');
      VoxEngine.terminate();
    }
  })
})

VoxEngine.addEventListener(AppEvents.CallAlerting, ({call, headers, scheme})=>{
  conf.add({
    call,
    displayName: headers['X-Name'],
    mode: 'FORWARD',
    direction: 'BOTH',
    scheme
  })
  call.answer();
})