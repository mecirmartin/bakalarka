import { Action, InputType } from "@projectstorm/react-canvas-core"

const ZOOM_LEVELS = [
  10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
  105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175,
  180, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250,
  255, 260, 265, 270, 275, 280, 285, 290, 295, 300,
]

export default class ZoomAction extends Action {
  constructor() {
    super({
      type: InputType.MOUSE_WHEEL,
      fire: ({ event }: any) => {
        // event.stopPropagation();

        const model = this.engine.getModel()

        // We can block layer rendering because we are only targeting the transforms
        model.getLayers().forEach(layer => layer.allowRepaint(false))

        const zoomDirection = Math.sign(event.deltaY) > 0 ? "in" : "out"

        const currentZoomLevelIndex = ZOOM_LEVELS.indexOf(
          ZOOM_LEVELS.includes(model.getZoomLevel())
            ? model.getZoomLevel()
            : 100
        )

        let nextZoomLevelIndex
        if (zoomDirection === "in") {
          nextZoomLevelIndex = Math.min(
            currentZoomLevelIndex + 1,
            ZOOM_LEVELS.length - 1
          )
        } else {
          nextZoomLevelIndex = Math.max(currentZoomLevelIndex - 1, 0)
        }

        const oldZoomFactor = model.getZoomLevel() / 100
        model.setZoomLevel(ZOOM_LEVELS[nextZoomLevelIndex])
        const zoomFactor = model.getZoomLevel() / 100

        const boundingRect = event.currentTarget.getBoundingClientRect()
        const clientWidth = boundingRect.width
        const clientHeight = boundingRect.height

        // Compute difference between rect before and after scroll
        const widthDiff = clientWidth * zoomFactor - clientWidth * oldZoomFactor
        const heightDiff =
          clientHeight * zoomFactor - clientHeight * oldZoomFactor

        // Compute mouse coords relative to canvas
        const clientX = event.clientX - boundingRect.left
        const clientY = event.clientY - boundingRect.top

        // Compute width and height increment factor
        const xFactor =
          (clientX - model.getOffsetX()) / oldZoomFactor / clientWidth
        const yFactor =
          (clientY - model.getOffsetY()) / oldZoomFactor / clientHeight

        model.setOffset(
          model.getOffsetX() - widthDiff * xFactor,
          model.getOffsetY() - heightDiff * yFactor
        )
        this.engine.repaintCanvas()

        // Re-enable rendering
        model.getLayers().forEach(layer => layer.allowRepaint(true))
      },
    })
  }
}
