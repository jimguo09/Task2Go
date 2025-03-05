// index.tsx
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Platform,
  UIManager,
} from "react-native";
import styles from "./index.styles";

// (Configuration) Enable LayoutAnimation on Android if needed for other parts
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Type definition for a Task object.
 * @property {string} id - A unique identifier for the task.
 * @property {string} title - The title of the task.
 * @property {string} description - The description of the task.
 * @property {boolean} completed - A flag indicating if the task is completed.
 */
type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

/**
 * Type definition for a special divider item that allows deletion of all completed tasks.
 * @property {string} id - A unique identifier for the item.
 * @property {string} type - A string indicating the type of the item.
 */
type DeleteAllItem = {
  id: "deleteAll";
  type: "deleteAll";
};

/**
 * ListItem can be either a Task or the special, singular DeleteAllItem.
 */
type ListItem = Task | DeleteAllItem;

/**
 * The main component of the Task2Go app.
 * It displays a list of tasks, handles creating new tasks, toggling completion, editing, and deleting tasks.
 */
export default function Index() {
  // -------------------- STATE VARIABLES --------------------
  // Array of tasks in the app.
  const [tasks, setTasks] = useState<Task[]>([]);
  // State for controlling the visibility of the New Task modal.
  const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState(false);
  // State for new task title and description inputs.
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  // State for the currently selected task (for viewing/editing details).
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  // State for controlling the visibility of the Info modal.
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  // State to track if the Info modal is in editing mode.
  const [isEditing, setIsEditing] = useState(false);
  // State variables for editing task title and description.
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // -------------------- FUNCTION DEFINITIONS --------------------

  /**
   * Creates a new task from the input fields.
   * Validates that the title is not empty, appends the task to the list, and resets the input fields.
   */
  const submitNewTask = () => {
    if (newTaskTitle.trim() === "") return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setIsNewTaskModalVisible(false);
  };

  /**
   * Toggles the completion state of a task when its fill bubble is pressed.
   * The task is removed from its current position and appended to the bottom of its respective group.
   * @param id - The unique identifier of the task.
   */
  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) => {
      let toggledTask: Task = {} as Task;
      const remaining = prevTasks.filter((task) => {
        if (task.id === id) {
          toggledTask = { ...task, completed: !task.completed };
          return false;
        }
        return true;
      });
      if (!toggledTask) return prevTasks;
      const incomplete = remaining.filter((t: Task) => !t.completed);
      const complete = remaining.filter((t: Task) => t.completed);
      if (toggledTask.completed) {
        complete.push(toggledTask);
      } else {
        incomplete.push(toggledTask);
      }
      return [...incomplete, ...complete];
    });
  };

  /**
   * Opens the Info modal to display task details.
   * Also initializes the edit fields with the task's current title and description.
   * @param task - The task object that was pressed.
   */
  const openInfoModal = (task: Task) => {
    setSelectedTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
    setIsInfoModalVisible(true);
  };

  /**
   * Saves any edits made to the selected task in the Info modal.
   * Updates the task list with the new title and description.
   */
  const saveEdits = () => {
    if (!selectedTask) return;
    const updatedTasks = tasks.map((item) =>
      item.id === selectedTask.id
        ? { ...item, title: editTitle, description: editDescription }
        : item
    );
    setTasks(updatedTasks);
    setSelectedTask({
      ...selectedTask,
      title: editTitle,
      description: editDescription,
    });
    setIsEditing(false);
  };

  // -------------------- LIST DATA PREPARATION --------------------
  // Filter tasks into incomplete and complete groups.
  const incompleteTasks = tasks.filter((t) => !t.completed);
  const completeTasks = tasks.filter((t) => t.completed);
  let displayData: ListItem[] = [];
  if (completeTasks.length > 0) {
    // Insert a special divider item for "Delete All Completed" between the groups.
    displayData = [
      ...incompleteTasks,
      { id: "deleteAll", type: "deleteAll" } as DeleteAllItem,
      ...completeTasks,
    ];
  } else {
    displayData = tasks;
  }

  /**
   * Deletes all tasks that are marked as completed.
   */
  const deleteAllCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  /**
   * Deletes a single task given its id.
   * @param id - The unique identifier of the task to delete.
   */
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // -------------------- RENDERING --------------------
  return (
    <View style={styles.container}>
      {/* Task List */}
      <FlatList
        data={displayData}
        keyExtractor={(item) => ("type" in item ? item.id : item.id)}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
        renderItem={({ item }) => {
          // Render the "Delete All Completed" divider if present.
          if ("type" in item && item.type === "deleteAll") {
            return (
              <View style={styles.deleteAllContainer}>
                <TouchableOpacity
                  style={styles.deleteAllButton}
                  onPress={deleteAllCompleted}
                >
                  <Text style={styles.deleteAllButtonText}>
                    Delete All Completed Tasks
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }
          // Otherwise, render a normal task.
          const taskItem = item as Task;
          return (
            <View style={styles.taskContainer}>
              {/* Fill Bubble: Toggles task completion */}
              <TouchableOpacity
                style={[
                  styles.fillBubble,
                  taskItem.completed && styles.fillBubbleCompleted,
                ]}
                onPress={() => toggleTaskCompletion(taskItem.id)}
              >
                {taskItem.completed && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
              {/* Task Title: Opens Info modal when pressed */}
              <TouchableOpacity
                style={styles.taskTextContainer}
                onPress={() => openInfoModal(taskItem)}
              >
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator
                  style={styles.taskTextScroll}
                >
                  <Text
                    style={[
                      styles.taskText,
                      taskItem.completed && styles.completedTask,
                    ]}
                  >
                    {taskItem.title}
                  </Text>
                </ScrollView>
              </TouchableOpacity>
              {/* Delete Icon: Deletes the task */}
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => deleteTask(taskItem.id)}
              >
                <Text style={styles.deleteIconText}>×</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      {/* New Task Modal */}
      <Modal transparent visible={isNewTaskModalVisible} animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>New Task</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Title"
              placeholderTextColor="#888"
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
            />
            <TextInput
              style={[styles.modalInput, styles.modalTextArea]}
              placeholder="Description"
              placeholderTextColor="#888"
              value={newTaskDescription}
              onChangeText={setNewTaskDescription}
              multiline
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={submitNewTask}
              >
                <Text style={styles.modalButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => {
                  setNewTaskTitle("");
                  setNewTaskDescription("");
                  setIsNewTaskModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Info Modal */}
      <Modal transparent visible={isInfoModalVisible} animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            {selectedTask && (
              <>
                <Text style={styles.modalTitle}>Task Details</Text>
                {isEditing ? (
                  <>
                    <TextInput
                      style={styles.modalInput}
                      value={editTitle}
                      onChangeText={setEditTitle}
                    />
                    <TextInput
                      style={[styles.modalInput, styles.modalTextArea]}
                      value={editDescription}
                      onChangeText={setEditDescription}
                      multiline
                    />
                  </>
                ) : (
                  <>
                    <Text style={styles.modalLabel}>Title:</Text>
                    <Text style={styles.modalContent}>
                      {selectedTask.title}
                    </Text>
                    <Text style={styles.modalLabel}>Description:</Text>
                    <Text style={styles.modalContent}>
                      {selectedTask.description}
                    </Text>
                  </>
                )}
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      if (isEditing) {
                        saveEdits();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                  >
                    <Text style={styles.modalButtonText}>
                      {isEditing ? "Save" : "Edit"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      setIsInfoModalVisible(false);
                      setIsEditing(false);
                      setSelectedTask(null);
                    }}
                  >
                    <Text style={styles.modalButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Floating New Task Button */}
      <TouchableOpacity
        style={styles.newTaskButton}
        onPress={() => setIsNewTaskModalVisible(true)}
      >
        <Text style={styles.newTaskButtonText}>New Task</Text>
      </TouchableOpacity>
    </View>
  );
}
