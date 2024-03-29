var campaign_id = localStorage.getItem("campaign");
var campaign = {};

send("/campaigns/" + campaign_id, "GET", {}, function(res) {
  campaign = res.data[0];
  insertValues();
});

send("/banners/" + campaign_id, "GET", {}, function(res) {
  loadAds(res.data);
});

$("input").bind("change keyup", function() {
  if (isActive()) {
    $("#save-btn")
      .addClass("btn-success")
      .removeClass("btn-danger");
  } else {
    $("#save-btn")
      .addClass("btn-danger")
      .removeClass("btn-success");
  }
});

function insertValues() {
  $("#campaign_name").val(campaign.campaign_name);
  $("#description").val(campaign.description);
  $("#views").val(campaign.views_left);
  $("#clicks").val(campaign.clicks_left);
  $("#starting_date").val(campaign.starting_date.split("T")[0]);
  $("#days").val(campaign.days);
  $("#client_name").val(campaign.client_info.name);
  $("#client_phone").val(campaign.client_info.phone);
  $("#client_email").val(campaign.client_info.email);
  $("#client_price").val(campaign.client_info.price);
  $("#client_balance").val(campaign.client_info.balance);
  $("#client_details").val(campaign.client_info.details);
  if (!campaign.isActive) {
    $("#save-btn")
      .addClass("btn-danger")
      .removeClass("btn-success");
  }
}

function isDateValid(start, end) {
  return new Date(start).getTime() / 1000 <= new Date(end).getTime() / 1000;
}

function loadAds(banners) {
  for (var i = 0; i < banners.length; i++) {
    var data = {
      url: banners[i].url,
      width: banners[i].size.split("X")[0],
      height: banners[i].size.split("X")[1],
      ad_id: banners[i].ad_id
    };

    insertBanner(data, i);
    $("#click-" + i).val(banners[i].onclick);
    $("#img-size-" + i).val(banners[i].size);
    removePosition(i, 0);
    for (var p = 0; p < banners[i].positions.length; p++) {
      addPosition(i);
      var site = banners[i].positions[p].split("-")[0];
      var pos = banners[i].positions[p].split("-")[1];
      var platform =
        banners[i].positions[p].split("-")[2] == undefined
          ? "desktop"
          : "mobile";
      $("#site-select-" + i + "-" + p).val(site);
      siteSelected("site-select-" + i + "-" + p);
      $("#pos-select-" + i + "-" + p).val(pos);
      document.getElementById(
        "platform-" + i + "-" + p + "-both"
      ).checked = false;
      document.getElementById(
        "platform-" + i + "-" + p + "-" + platform
      ).checked = true;
    }
  }
}

function save() {
  deleteBanners()
  var my_campaign = composeCampaign();
  my_campaign.campaign_id = campaign.campaign_id;
  send("/campaigns/" + campaign_id, "PUT", my_campaign, function(res) {
    send("/banners/", "PUT", { banners: composeBanners(my_campaign, false) }, function(res) {
      swal("הקמפיין עודכן בהצלחה", "", "success");
    });
  });
}

function send(url, method, body, callback) {
  axios({
    url: url,
    method: method,
    headers: { auth: "1234" },
    data: body
  })
    .then(function(res) {
      callback(res);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function deleteBanners() {
  deleteBannersArray.forEach(bannerId => {
    axios({
      method: "delete",
      url: "/banners/",
      data: {id: bannerId},
      headers: { auth: "1234" }
    });
  });
}