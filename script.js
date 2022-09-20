// Filter Function Start
function filterNodes(keyWord) {
  if (!keyWord.length) {
    window.alert("Please type key word firstly.");
    return;
  } else {
    var $chart = $(".orgchart");
    // disalbe the expand/collapse feture and distinguish the matched nodes and the unmatched nodes according to the given key word
    $chart
      .find(".node")
      .filter(function(index, node) {
        return (
          $(node)
            .text()
            .toLowerCase()
            .indexOf(keyWord) > -1
        );
      })
      .addClass("matched")
      .closest("table")
      .parents("table")
      .find("tr:first")
      .find(".node")
      .addClass("retained");

    // hide the unmatched nodes
    $chart.find(".matched,.retained").each(function(index, node) {
      $(node)
        .removeClass("slide-up")
        .closest(".nodes")
        .removeClass("hidden")
        .siblings(".lines")
        .removeClass("hidden");
      var $unmatched = $(node)
        .closest("table")
        .parent()
        .siblings()
        .find(".node:first:not(.matched,.retained)")
        .closest("table")
        .parent()
        .addClass("hidden");
      $unmatched
        .parent()
        .prev()
        .children()
        .slice(1, $unmatched.length * 2 + 1)
        .addClass("hidden");
    });

    $chart.find(".matched").each(function(index, node) {
      if (
        !$(node)
          .closest("tr")
          .siblings(":last")
          .find(".matched").length
      ) {
        $(node)
          .closest("tr")
          .siblings()
          .addClass("hidden");
      }
    });
  }
}
 // hide the unmatched nodes end
 // Filter Function End




// Refresh Function
function clearFilterResult() {
  window.location.reload();
}
// Refresh Function End


(function($) {
  $(function() {
    var ds = {
      name: "Dendrogram",
      title: "dendrogram",
      children: [
        {
          name: "Skills",
          title: "skills",
          children: [
            {
              name: "Programming",
              title: "programming",
              children: [
                { name: "Freelance", title: "freelance"  },
                { name: "Blogging", title: "blogging " },
                { name: "Software Engineer", title: "software_engineering" }
              ]
            },
            {
              name: "Maths",
              title: "maths",
              children: [
                { name: "Budget Analyst", title: "budget_analyst",
               children: [
                { name: "Freelance", title: "freelance " },
                { name: "Blogging", title: "blogging " },
                { name: "Software Engineering", title: "software_engineering" }
              ]
              },
                { name: "Astronomer", title: "astronomer" },
                { name: "Data Scientist", title: "data_scientist" }
              ]
            }
          ]
        },
        {
          name: "Su Miao",
          title: "Hobbies",
          children: [
            { name: "Pang Pang", title: "music" },
            {
              name: "Hei Hei",
              title: "designing",
              children: [
                { name: "Xiang Xiang", title: "UE engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },

                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },

                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },

                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                
                { name: "Dan Dan", title: "engineer" },

                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },

                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },

                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Zai Zai", title: "engineer" }
              ]
            }
          ]
        },
        {
          name: "Su Miao",
          title: "Interests",
          children: [
            { name: "Pang Pang", title: "history" },
            {
              name: "Hei Hei",
              title: "travelling",
              children: [
                { name: "Xiang Xiang", title: "UE engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Zai Zai", title: "engineer" }
              ]
            }
          ]
        }
      ]
    }



var showDescendents = function(node, depth) {
      if (depth === 1) {
        return false;
      }
      $(node).closest('tr').siblings(':last').children().find('.node:first').each(function(index, node) {
        var $temp = $(node).closest('tr').siblings().removeClass('hidden');
        var $children = $temp.last().children().find('.node:first');
        if ($children.length) {
          $children[0].style.offsetWidth = $children[0].offsetWidth;
        }
        $children.removeClass('slide-up');
        showDescendents(node, depth--);
      });
    };

    $('#chart-container').orgchart({
      'visibleLevel': 2,
      'data' : ds,
      'nodeContent': 'title',

      'createNode': function($node, data) {
      var secondMenu = '<a  href="'+ data.title +'.html"><div class="close"><i class="fa fa-link"></i></div></a></div>';
      $node.append(secondMenu);
      }
    });

    $("#btn-filter-node").on("click", function() {
      filterNodes($("#key-word").val());
    });

    $("#key-word").on("keyup", function(event) {
      if (event.which === 1) {
        filterNodes(this.value);
      } else if (event.which === 8 && this.value.length === 0) {
        clearFilterResult();
      }
    });
  });
})(jQuery);



