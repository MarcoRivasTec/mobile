import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";

import Svg, { Circle } from "react-native-svg";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";

import ContentHeader from "./ContentHeader";
import { cursos as styles } from "./styles.jsx";

const courseImage = require("../../../assets/images/course-code-conduct.png");
const courseArrowIcon = require("../../../assets/images/up-arrow.png");

const COURSES_MOCK = [
	{
		id: "1",
		title: "Curso Código de conducta",
		progress: 80,
		status: "Clase vista",
		image: courseImage,
	},
	{
		id: "2",
		title: "Curso Código de conducta",
		progress: 80,
		status: "Clase vista",
		image: courseImage,
	},
	{
		id: "3",
		title: "Curso Código de conducta",
		progress: 80,
		status: "Clase vista",
		image: courseImage,
	},
	{
		id: "4",
		title: "Curso Código de conducta",
		progress: 80,
		status: "Clase vista",
		image: courseImage,
	},
	{
		id: "5",
		title: "Curso Código de conducta",
		progress: 80,
		status: "Clase vista",
		image: courseImage,
	},
];

function ProgressCircle({ progress }) {
	const size = 42;
	const strokeWidth = 4;

	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;

	const safeProgress = Math.min(100, Math.max(0, Number(progress) || 0));

	const strokeDashoffset = circumference - (safeProgress / 100) * circumference;

	return (
		<View style={styles.progressContainer}>
			<Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
				<Circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke="#C9CCCE"
					strokeWidth={strokeWidth}
					fill="transparent"
				/>

				<Circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke="#2F8588"
					strokeWidth={strokeWidth}
					fill="transparent"
					strokeLinecap="round"
					strokeDasharray={`${circumference} ${circumference}`}
					strokeDashoffset={strokeDashoffset}
					transform={`rotate(-90 ${size / 2} ${size / 2})`}
				/>
			</Svg>

			<View style={styles.progressTextContainer}>
				<Text style={styles.progressText}>{safeProgress}%</Text>
			</View>
		</View>
	);
}

function CourseCard({ course, onPress }) {
	return (
		<TouchableOpacity
			style={styles.courseCard}
			onPress={() => onPress(course)}
			activeOpacity={0.85}
		>
			<View style={styles.courseImageContainer}>
				<Image
					source={course.image}
					style={styles.courseImage}
					resizeMode="cover"
				/>
			</View>

			<Text style={styles.courseTitle} numberOfLines={2}>
				{course.title}
			</Text>

			<View style={styles.courseStatusRow}>
				<ProgressCircle progress={course.progress} />

				<Text style={styles.courseStatus}>{course.status}</Text>
			</View>

			<Image
				source={courseArrowIcon}
				style={styles.courseArrowIcon}
				resizeMode="contain"
			/>
		</TouchableOpacity>
	);
}

export default function Cursos() {
	const handleCoursePress = (course) => {
		console.log("Course selected:", course);

		/*
			Later:

			navigation.navigate("CourseDetails", {
				courseId: course.id,
			});

			or open Moodle / API URL.
		*/
	};

	const renderCourse = ({ item }) => (
		<CourseCard course={item} onPress={handleCoursePress} />
	);

	return (
		<View style={styles.container}>
			<ContentHeader title="Cursos | Da clic para acceder" />

			<View style={styles.contentContainer}>
				<FlatList
					data={COURSES_MOCK}
					keyExtractor={(item) => item.id}
					renderItem={renderCourse}
					numColumns={2}
					style={styles.courseList}
					contentContainerStyle={styles.courseListContent}
					columnWrapperStyle={styles.courseRow}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</View>
	);
}
