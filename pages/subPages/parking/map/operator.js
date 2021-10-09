  // 创建marker并添加, 并缩放视野展示所有经纬度
  // context 地图实例
   export const setMarkersOnMap = (context, arr) => {
    let markers = arr.map(v => (
      {
        id: v.orgId * 1,
        longitude: v.longitude,
        latitude: v.latitude
      }
    ))
    context.initMap({
      markers,
      includePoints: markers
    })
  }
  // 设置当前位置
  export const setCurrentPosOnMap = (context, { latitude, longitude }) => {
    context.initMap({
      latitude,
      longitude
    })
  }