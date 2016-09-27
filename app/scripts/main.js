/*global $ $:true*/
/*global database database:true*/
/*global order order:true*/
/*eslint no-undef: "error"*/
$(function () {
  var categories = {};
  var div = document.createElement('div');

  $.each(database, function (_, v) {
    var key = v['spec name'];
    if (!categories[key]) {
      categories[key] = [];
    }
    categories[key].push(v);
  });
  $('.main-content').append(function () {
    return $.map(order, function (v, i) {
      var h1 = v.h1, h2s = v.h2s;
      var html =
        '<article class="theme' + [i % 8] + '">' +
        '<h1>' + h1 + '</h1>' +
        '<div>' +

        $.map(h2s, function (h2) {
          return '<div>' +

            $.map(h2, function (key) {
              return '<section>' +
                '<h2>' + key + '</h2>' +
                '<ul>' +

                $.map(categories[key], function (data) {
                  if (data.Name) {
                    var name = (data.Name.indexOf(',') !== -1) ?
                      (data.Name.split(',')[0]) :
                      data.Name;
                  }

                  if (name && !($.camelCase($.trim(name)) in div.style)) {
                    if (key !== "Selectors Level 3") {
                      var className = 'removed old-version';
                    }
                  }
                  return '<li >' +
                    '<a    class="' + className + '"   target="_blank"  href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/' + name + '" ctrl_href="' + data.uri + '" title="' + data.Initial + '" ' +
                    'data-apply="' + data['Applies To'] + '" ' +
                    'data-value="' + data.Value + '" data-initial="' + data.Initial + '">' +
                    name +
                    '</a>' +
                    '</li>';
                }).join('') +

                '</ul>' +
                '</section>';
            }).join('') +

            '</div>';
        }).join('') +

        '</div>' +
        '</article>';
      return html;
      ///first loop end below!
    });
    //// append end below!
  });

});