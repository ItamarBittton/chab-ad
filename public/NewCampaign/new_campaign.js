var CLOUDINARY = "https://api.cloudinary.com/v1_1/dukdfuywh/upload";
var CLOUDINARY_UPLOAD_PRESET = "fxdiq2wt";

var chabadInfoPositions = [
  "music_right_top",
  "music_left_top",
  "top_banner",
  "golden_left",
  "single",
  "video_side_280X395",
  "home_under_main_1290X200",
  "news_top",
  "post-1",
  "post-2",
  "post-3",
  "post-4",
  "post-5",
  "post-6",
  "post-7",
  "post-8",
  "post-9",
  "post-10",
  "post-11",
  "post-12",
  "post-13",
  "post-14",
  "post-15",
  "post-16",
  "post-17",
  "post-18",
  "post-19",
  "post-20",
  "post-21",
  "post-22",
  "post-23",
  "post-24",
  "post-25",
  "post-26",
  "post-27",
  "post-28",
  "post-29",
  "post-30",
  "post-31",
  "post-32",
  "post-33",
  "post-34",
  "post-35",
  "post-36",
  "sidebar_magazine_1",
  "sidebar_magazine_2",
  "sidebar_magazine_3",
  "sidebar_above_video_1",
  "sidebar_under_video_1",
  "sidebar_under_video_2",
  "sidebar_under_video_3",
  "sidebar_under_hotnews_1",
  "sidebar_under_hotnews_2",
  "sidebar_under_hotnews_3",
  "sidebar_under_editor_1",
  "sidebar_under_editor_2",
  "sidebar_under_editor_3",
  "sidebar_under_masia_1",
  "sidebar_under_masia_2",
  "sidebar_under_masia_3",
  "sidebar_under_infomag_1",
  "sidebar_under_infomag_2",
  "sidebar_under_infomag_3",
  "sidebar_under_deot_1",
  "sidebar_under_deot_2",
  "sidebar_under_deot_3",
  "single_600X300",
  "under_mag_widget",
  "midcol_under_buisindex_1",
  "midcol_under_buisindex_2",
  "midcol_under_eventboard",
  "midcol_under_mazal",
  "midcol_under_recsites",
  "midcol_under_tehilimwidget",
  "midcol_under_linkbuttons"
];
var chabadInfoComPositions = ["example-1", "example-2"];
var nesheiPositions = ["example-3", "example-4"];

var posArray = [];
var adArray = [];

var positions = {};
var ads = 0;

function addPosition(id) {
  var position = positions[id]++;

  $("#positions-" + id).append(
    `<div class="position" id="pos-${id}-${position}">
            <div class="btn btn-danger remove-pos-btn" onclick="removePosition(${id},${position})">הסר</div>
            <div class="radio">
                <label class="checkbox-radio"><input type="radio" name="platform-${id}-${position}" value="mobile">נייד</label>
                <label class="checkbox-radio"><input type="radio" name="platform-${id}-${position}"  value="desktop">נייח</label>
                <label class="checkbox-radio"><input type="radio" name="platform-${id}-${position}" checked value="both">שניהם</label>
            </div>
            <select class="form-control my-selector" id="pos-select-${id}-${position}">
                <option hidden>בחר מיקום</option>
            </select>
            <select class="form-control my-selector" id="site-select-${id}-${position}" onchange="siteSelected(event)">
                <option hidden>בחר אתר</option>
                <option>chabad.info</option>
                <option>chabadinfo.com</option>
                <option>neshei.com</option>
            </select>
        </div>`
  );
}

function removePosition(id, pos) {
  $(`#pos-${id}-${pos}`).remove();

  for (let index = pos + 1; index < positions[id]; index++) {
    $(`#pos-${id}-${index}`).attr("id", index - 1);
  }

  positions[id]--;
}

function siteSelected(e) {
  var id = e.target.id.split("site-select-")[1];
  switch (document.getElementById(e.target.id).value) {
    case "chabad.info":
      insertActions(id, chabadInfoPositions);

      break;
    case "chabadinfo.com":
      insertActions(id, chabadInfoComPositions);

      break;
    case "neshei.com":
      insertActions(id, nesheiPositions);

      break;
  }
}

function insertActions(id, positions) {
  var select = document.getElementById("pos-select-" + id);
  $("#pos-select-" + id).empty();
  for (let i = 0; i < positions.length; i++) {
    select.options[select.options.length] = new Option(positions[i]);
  }
}

function addAdToArray() {
  var ad = {
    positions: posArray,
    url: document.getElementById("img-preview").src,
    onclick: document.getElementById("click").value,
    size: document.getElementById("img-size").innerHTML
  };
  adArray.push(ad);
  posArray = [];
}

function fillAdsArray(campaign) {
  isEmpty = true;
  for (let i = 0; i < adArray.length; i++) {
    if (adArray[i] != null) {
      isEmpty = false;
      var data = getExtraData(adArray[i].positions);
      adArray[i].campaign_id = campaign.campaign_id;
      adArray[i].campaign_name = campaign.campaign_name;
      (adArray[i].starting_date = campaign.starting_date),
        (adArray[i].expiration_date = campaign.expiration_date),
        (adArray[i].ad_id = campaign.campaign_id + i.toString()),
        (adArray[i].platform = data.platforms);
      adArray[i].sites = data.sites;
      adArray[i].positions_names = data.names;
      adArray[i].clicks = 0;
      adArray[i].views = 0;
    }
  }

  if (isEmpty) {
    swal({
      title: "אין פרסומות בקמפיין",
      text: "?האם ברצונך לשמור את הקמפיין כך",
      icon: "warning",
      buttons: true
    }).then(isOk => {
      if (isOk) {
        post("/campaigns", { auth: "1234" }, campaign, function(res) {
          swal("מזל טוב", "הקמפיין התווסף בהצלחה", "success", {
            button: "סגור"
          });
        });
      }
    });
  } else {
    var header = { auth: "1234" };
    post("/campaigns", header, campaign, function(res) {
      post("/banners", header, { ads: adArray }, function(res) {
        swal("מזל טוב", "הקמפיין התווסף בהצלחה", "success", {
          button: "סגור"
        });
      });
    });
  }
}



function getExtraData(positions) {
  var platforms = [];
  var sites = [];
  var names = [];
  positions.forEach(function(pos) {
    sites.push(pos.split("-")[0]);
    names.push(pos.split("-")[1]);
    if (pos.split("-").length == 3) {
      platforms.push("נייד");
    } else {
      platforms.push("נייח");
    }
  });
  var uniquePlatforms = [];
  $.each(platforms, function(i, el) {
    if ($.inArray(el, uniquePlatforms) === -1) uniquePlatforms.push(el);
  });

  var uniqueSites = [];
  $.each(sites, function(i, el) {
    if ($.inArray(el, uniqueSites) === -1) uniqueSites.push(el);
  });

  var uniqueNames = [];
  $.each(names, function(i, el) {
    if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
  });

  return {
    platforms: uniquePlatforms,
    sites: uniqueSites,
    names: uniqueNames
  };
}