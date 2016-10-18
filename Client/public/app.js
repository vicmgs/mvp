$(document).ready(function(){

  $.ajax({
     url: '/f1news',
     error: function(err) {
        console.log('error: ', err);
     },
     success: function(data) {
       var tempDom = $('<div></div>').append($.parseHTML(data));
       tempDom.find('.g').find('.st').nextAll().remove();
       for (var i = 0; i < 4; i++) {
         $('.f1news').append(tempDom.find('.g')[i]);
       }
     },
     type: 'GET'
   });

   $.ajax({
      url: '/wtccnews',
      error: function(err) {
         console.log('error: ', err);
      },
      success: function(data) {
        var tempDom = $('<div></div>').append($.parseHTML(data));
        tempDom.find('.g').find('.st').nextAll().remove();
        for (var i = 0; i < 4; i++) {
          $('.wtccnews').append(tempDom.find('.g')[i]);
        }
      },
      type: 'GET'
    });

    $.ajax({
       url: '/wrcnews',
       error: function(err) {
          console.log('error: ', err);
       },
       success: function(data) {
         var tempDom = $('<div></div>').append($.parseHTML(data));
         tempDom.find('.g').find('.st').nextAll().remove();
         for (var i = 0; i < 4; i++) {
           $('.wrcnews').append(tempDom.find('.g')[i]);
         }
       },
       type: 'GET'
     });

     $.ajax({
        url: '/motogpnews',
        error: function(err) {
           console.log('error: ', err);
        },
        success: function(data) {
          var tempDom = $('<div></div>').append($.parseHTML(data));
          tempDom.find('.g').find('.st').nextAll().remove();
          for (var i = 0; i < 4; i++) {
            $('.motogpnews').append(tempDom.find('.g')[i]);
          }
        },
        type: 'GET'
      });

      $.ajax({
         url: '/wsbknews',
         error: function(err) {
            console.log('error: ', err);
         },
         success: function(data) {
           var tempDom = $('<div></div>').append($.parseHTML(data));
           tempDom.find('.g').find('.st').nextAll().remove();
           for (var i = 0; i < 4; i++) {
             $('.wsbknews').append(tempDom.find('.g')[i]);
           }
         },
         type: 'GET'
       });

       $.ajax({
          url: '/dtmnews',
          error: function(err) {
             console.log('error: ', err);
          },
          success: function(data) {
            var tempDom = $('<div></div>').append($.parseHTML(data));
            tempDom.find('.g').find('.st').nextAll().remove();
            for (var i = 0; i < 4; i++) {
              $('.dtmnews').append(tempDom.find('.g')[i]);
            }
          },
          type: 'GET'
        });

        $.ajax({
           url: '/supergtnews',
           error: function(err) {
              console.log('error: ', err);
           },
           success: function(data) {
             var tempDom = $('<div></div>').append($.parseHTML(data));
             tempDom.find('.g').find('.st').nextAll().remove();
             for (var i = 0; i < 4; i++) {
               $('.supergtnews').append(tempDom.find('.g')[i]);
             }
           },
           type: 'GET'
         });
});
