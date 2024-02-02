/* eslint-disable react/prop-types */
import {
  Flex,
  Text,
  Input,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Checkbox,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { DeleteIcon, EditIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";

// ...

const App = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = (e) => {
    e.preventDefault();

    if (newTask.length > 0) {
      setTasks((prevState) => [
        ...prevState,
        {
          text: newTask,
          isChecked: false,
        },
      ]);
      setNewTask("");
    }
  };

  const updateTask = (index, newText) => {
    let newTasks = [...tasks];
    newTasks[index].text = newText;
    setTasks(newTasks);
  };

  const handleCheckboxChange = (index) => {
    let newTasks = [...tasks];
    newTasks[index].isChecked = !newTasks[index].isChecked;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    let newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <>
      <Flex w="100%" h="100vh">
        <Flex w="100%" flexDir="column" mt="2%" flex align="center">
          <Text fontWeight="700" fontSize="30px" mb="2%">
            Fadhil&apos;s Todo App
          </Text>
          <form onSubmit={addTask}>
            <Flex mt="2%">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                variant="flushed"
                placeholder=" Add Task"
                w="100%"
              />
              <Button
                type="submit"
                ml={5}
                bg="blue.400"
                color="yellow"
                marginBottom="5px"
              >
                Add Task
              </Button>
            </Flex>
          </form>
          <Tabs mt="2%" w="23%">
            <TabList>
              <Tab>Incompleted Task</Tab>
              <Tab>Completed Task</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {tasks.map((task, index) => (
                  <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                    onCheckboxChange={handleCheckboxChange}
                  />
                ))}
              </TabPanel>
              <TabPanel>
                {tasks.map((task, index) =>
                  task.isChecked ? (
                    <TaskItem
                      key={index}
                      task={task}
                      index={index}
                      deleteTask={deleteTask}
                      onCheckboxChange={handleCheckboxChange}
                    />
                  ) : null
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </>
  );
};

const TaskItem = ({
  task,
  index,
  updateTask,
  deleteTask,
  onCheckboxChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskText, setEditedTaskText] = useState(task.text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    updateTask(index, editedTaskText);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleCheckboxClick = () => {
    onCheckboxChange(index);
  };

  return (
    <Flex mb={5} w="100%" flexDir="row" align="center">
      <Checkbox
        colorScheme="blue"
        isChecked={task.isChecked}
        onChange={handleCheckboxClick}
      >
        {isEditing ? (
          <Input
            value={editedTaskText}
            onChange={(e) => setEditedTaskText(e.target.value)}
            onBlur={handleSaveClick}
            autoFocus
          />
        ) : (
          <Text
            color={task.isChecked ? "gray.500" : "black"}
            alignSelf="center"
            flex="1"
            textDecoration={task.isChecked ? "line-through" : "none"}
          >
            {task.text}
          </Text>
        )}
      </Checkbox>
      {!task.isChecked && (
        <>
          <IconButton
            bg="red.600"
            ml={5}
            icon={isEditing ? <CheckIcon /> : <EditIcon />}
            onClick={isEditing ? handleSaveClick : handleEditClick}
          />
          {isEditing && (
            <IconButton
              bg="gray.400"
              ml={5}
              icon={<CloseIcon />}
              onClick={handleCancelClick}
            />
          )}
        </>
      )}
      <IconButton
        bg="red.600"
        ml={5}
        icon={<DeleteIcon />}
        onClick={() => deleteTask(index)}
      />
    </Flex>
  );
};

export default App;
