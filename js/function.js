$(function(){
  $(window).on('load',function(){
    new WOW().init();
  });
});//wow plugin 초기화

$(function(){
  var $header = $('header');
  var $mnu = $('header>.container>nav>.gnb>li>a');
  var scrollTop = 0;
  var nowIdx = 0;
  var arrTopVal = [];

  var $profileList = $('#profile>.profile-right>.profile>.mnu>li>a');
  var $profileListImg = $('#profile>.profile-right>.profile>.view>li');

  var $protfolioList = $('#portfolio>.container>.mnu>li>a');
  var $protfolioListImg = $('#portfolio>.container>.view>li');

  var $viewOpen = $('.viewOpen');
  var $viewClose = $('.viewClose');
  var $viewImg = $('#portfolio>.portfolio_bg>.portfolio_img');
  var $view = $('#portfolio>.portfolio_bg');

  var profileNowIdx = 0;
  var nowIdx = 0;

  $('section').each(function(idx){
    arrTopVal[idx] = $(this).offset().top;
  });

  //메뉴
  $mnu.on('click',function(event){
    event.preventDefault();
    nowIdx = $mnu.index(this);

    $mnu.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
    $('html,body').stop().animate({
      scrollTop : arrTopVal[nowIdx]
    },500,'easeInOutCubic');
  });

  //스크롤
  $(window).on('scroll',function(){
    scrollTop = $(this).scrollTop();

    if(scrollTop>arrTopVal[0]){
      $header.addClass('active');
    }else{
      $header.removeClass('active');
    }

    for(var i=0; i<5; i++){
      if(scrollTop>=arrTopVal[i]){ 
        $mnu.eq(i).parent().addClass('on').siblings().removeClass('on');
      }
    }
  });

  //프로파일 탭
  $profileList.on('click',function(event){
    event.preventDefault();
    profileNowIdx = $profileList.index(this);

    $profileList.eq(profileNowIdx).parent().addClass('on').siblings().removeClass('on');

    $profileListImg.fadeOut();
    $profileListImg.eq(profileNowIdx).fadeIn();
  });

  //포트폴리오 탭
  $protfolioList.on('click',function(event){
    event.preventDefault();
    nowIdx = $protfolioList.index(this);

    $protfolioList.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');

    $protfolioListImg.fadeOut();
    $protfolioListImg.eq(nowIdx).fadeIn();
  });

  //상세내용 클릭
  $viewOpen.on('click',function(event){
    event.preventDefault();
    var src = $(this).attr('href');

    $viewImg.find('a').css({
      backgroundImage : 'url('+src+')'
    });

    $viewImg.parent().fadeIn();
  });

  //상세내용 팝업 내부 클릭
  $viewClose.on('click',function(event){
    event.preventDefault();
    $viewImg.scrollTop(0)
    $view.fadeOut();
  });
  
  //상세내용 팝업 바깥 클릭
  $view.on('click',function(){
    $viewImg.scrollTop(0)
    $view.fadeOut();
  });
});


// 포트폴리오 > 상세내용 클릭
function imgSizeChange(event, width, height) {
  event.preventDefault();
  let portfolio_img = document.getElementsByClassName("portfolio_img")[0];
  let viewClose = document.getElementsByClassName("viewClose")[0];
  portfolio_img.style.width = String(width) +"px";
  portfolio_img.style.marginLeft = "-" + String(width/2) + "px";
  viewClose.style.height = String(height) + "px";
}