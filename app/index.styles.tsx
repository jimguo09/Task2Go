// index.styles.ts
import { StyleSheet } from "react-native";

/**
 * Stylesheet for the index.tsx file.
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  newTaskButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  newTaskButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  taskContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#4A90E2",
  },
  fillBubble: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  fillBubbleCompleted: {
    backgroundColor: "#4A90E2",
  },
  checkmark: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  taskTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  taskTextScroll: {
    flexShrink: 1,
  },
  taskText: {
    fontSize: 18,
    color: "#fff",
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#ccc",
  },
  deleteIcon: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#ff3b30",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  deleteIconText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  deleteAllContainer: {
    paddingVertical: 10,
    alignItems: "center",
  },
  deleteAllButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  deleteAllButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2a3d54",
    alignSelf: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: "#2a3d54",
    marginBottom: 15,
  },
  modalTextArea: {
    height: 80,
    textAlignVertical: "top",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  modalCancelButton: {
    backgroundColor: "#888",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2a3d54",
    marginTop: 10,
  },
  modalContent: {
    fontSize: 16,
    color: "#2a3d54",
    marginBottom: 10,
  },
});

export default styles;
