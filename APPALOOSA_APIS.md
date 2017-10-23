Need a cloud to host releases applications (use at /mobile_application_updates/upload param binary_path)

https://www.appaloosa-store.com?api_key=YOUR_API_KEY
  /api/v2/YOUR_STORE_ID
    GET /mobile_application_updates{?user_email,group_name,platforms,page,per}

    GET /mobile_application_updates/{mobile_application_update_id}

    PATCH /mobile_application_updates/{mobile_application_update_id}
      name: MyApp (string, optional) - The name of your app
      group_ids: [8940] (array, optional) - Mobile application update’s groups ids
      catchphrase: The best app (string, optional) - Mobile application update’s catch phrase
      description: Never miss a deal (string, optional) - Mobile application update’s description
      icon: icon.png (attachement, optional) - Mobile application update’s icon
      banner: file (attachement, optional) - Mobile application update’s banner
      screenshot1: file1.png (attachement, optional) - Mobile application update’s screenshot 1
      screenshot2: file2.png (attachement, optional) - Mobile application update’s screenshot 2
      screenshot3: file3.png (attachement, optional) - Mobile application update’s screenshot 3
      screenshot4: file4.png (attachement, optional) - Mobile application update’s screenshot 4
      screenshot5: file5.png (attachement, optional) - Mobile application update’s screenshot 5
      push_force_install: false 

    POST /mobile_application_updates/upload
      "mobile_application_update": {
        "binary_path": "http://www.application.io/application.ipa",
        "screenshot1": "http://www.application.io/screenshot1.png",
        "screenshot2": "http://www.application.io/screenshot2.png",
        "screenshot3": "http://www.application.io/screenshot3.png",
        "screenshot4": "http://www.application.io/screenshot4.png",
        "screenshot5": "http://www.application.io/screenshot5.png",
        "banner": "http://www.application.io/banner.png",
        "description": "Never miss a deal",
        "catchphrase": "The best app"
      }

    GET /mobile_applications/{mobile_application_id}/mobile_application_updates{?page,per}